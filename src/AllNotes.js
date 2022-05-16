import axios from "axios";
import GraphUI from "./GraphUI"
import React from "react";
import Legend from "./Legend"

const orig_width = 1500
const viewbox_width = 10000

class AllNotes extends React.Component {
  state = {
    allNotes: [],
    links: {},
    treeData: {},
    titleMap:{}
  };

  saveLinks() {
    axios
    .post("http://localhost:8000/links", {links: JSON.stringify(this.state.links)})
    .then(res => {
      console.log("saving", res.data)
      console.log("links", JSON.stringify(this.state.links))
      if (this.state.allNotes.length == 0) {
        this.init()
      }
    })
  }

  parseTitleToPlainText(formattedTitle) {
    var isValidJSON = true; 
    try {
      JSON.parse(formattedTitle)
    }
    catch {
      isValidJSON = false;
    }
    if (!isValidJSON)return formattedTitle

    var plaintextTitle = ''
    console.log(formattedTitle)
    var entries = JSON.parse(formattedTitle)["ops"]
    entries.forEach(function(entry){
      plaintextTitle = plaintextTitle+entry['insert']
    })
    plaintextTitle = plaintextTitle.replace(/\n+$/, "")
    return plaintextTitle
  }

  updateTitleMap() {  
    //this maps note ids to titles (plain Text) to allow easy recursion while creating the tree data structure for rendering
    var titleMap = {}
    this.state.allNotes.forEach(note => {
      titleMap[note._id] = this.parseTitleToPlainText(note.title)
      
    })
    this.setState({titleMap:titleMap})
    console.log("titlemap" ,this.state.titleMap)
  }

  // driver function
  populateTreeData() {
    console.log("tree data links", this.state.links)
    if (Object.keys(this.state.links).length == 0) {
      return
    }

    console.log(Object.keys(this.state.links)[0])
    var treeData = this.recurseTreeData(this.state.links, Object.keys(this.state.links)[0])
    this.setState({ 
      treeData: treeData,
    });
  }

  // recursion
  recurseTreeData(links, id) {
    if (links[id].length == 0) {
      return {
        "name": this.state.titleMap[id],
        "id": id,
        "size": [(150/orig_width)*viewbox_width, (150/orig_width)*viewbox_width],
        "children": []
      }
    }

    var treeData = {
      "name": this.state.titleMap[id],
      "id": id,
      "size": [(150/orig_width)*viewbox_width, (150/orig_width)*viewbox_width],
      "children": []
    }
    links[id].forEach(childId => {
      treeData.children.push(this.recurseTreeData(links, childId))
    });
    return treeData
  }

  init() {
    // there should not be a case when allNotes length is 0 and links is not 0
    if (this.state.allNotes.length == 0) {
      console.log("initializing...")
      axios
      .post("http://localhost:8000/notes", {title: "Master", content: "-"})
      .then(() => {
        axios
        .get("http://localhost:8000/notes")
        .then(res => {
          var notes = [];
          res.data.rows.forEach(note => {
            notes.push(note.doc)
          })
          var rootLink = notes[0]._id
          this.setState({ 
            allNotes: notes
          });
          var links = this.state.links
          links[rootLink] = []
          this.setState({links:links})
        })
        .then(() => {
          this.updateTitleMap()
          this.populateTreeData()
        })
        .then(() => {
          this.saveLinks()
        })
      })
    }
    else {
      axios
      .get("http://localhost:8000/links")
      .then(res => {
        console.log("got links")
        const links = JSON.parse(res.data.links)
        this.setState({ 
          links: links,
        });
      })
      .then(() => {
        this.updateTitleMap()
        this.populateTreeData()
      })
    }
  }

  componentDidMount() {
    axios
    .get("http://localhost:8000/notes")
    .then(res => {
      console.log("HEYYY")
      var notes = [];
      res.data.rows.forEach(note => {
        notes.push(note.doc)
      })
      this.setState({ 
        allNotes: notes,
      });
      this.updateTitleMap()
    })
    .then(() => {
      console.log("Initializing")
      this.init()
    })
  }

  deleteLinks(id) {
    if (this.state.links[id] === undefined) {
      return
    }
    if (this.state.links[id].length == 0) {
      delete this.state.links[id]
    }
    else {
      this.state.links[id].forEach(element => {
        this.deleteLinks(element)
      });
      delete this.state.links[id]
    }
    this.setState({
      links: this.state.links
    })
  }

  deleteNote({variables}) {
    axios
    .delete("http://localhost:8000/notes/" + variables._id)
    .then(() => {
      axios
      .get("http://localhost:8000/notes")
      .then(res => {
        var notes = [];
        res.data.rows.forEach(note => {
          notes.push(note.doc)
        })
        this.setState({ 
          allNotes: notes
        });
        for (const [key, value] of Object.entries(this.state.links)) {
          if (this.state.links[key].includes(variables._id)) {
            const index = this.state.links[key].indexOf(variables._id)
            if (index > -1) {
              this.state.links[key].splice(index, 1)
              break
            }
          }
        }
        this.deleteLinks(variables._id)
        this.updateTitleMap()
        this.populateTreeData()
        this.saveLinks()
        // this.props.history.push("/")
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  addChild({variables}) {
    axios
    .get("http://localhost:8000/notes/addChild/" + variables._id)
    .then(res => {
      const newChild = res.data;
      this.setState({ 
        allNotes: this.state.allNotes.concat([newChild])
      });
      this.state.links[variables._id].push(newChild._id)
      this.state.links[newChild._id] = []
      this.setState({links:this.state.links})
    })
    .then(() => {
      this.updateTitleMap()
      this.populateTreeData()
      this.props.history.push("/");
    })
    .then(() => {
      this.saveLinks()
    })
    .catch(err => {
      console.log(err);
    });
  }

  addSibling({variables}) {
    axios
    .get("http://localhost:8000/notes/addSibling/" + variables._id)
    .then(res => {
      const newSibling = res.data;
      this.setState({ 
        allNotes: this.state.allNotes.concat([newSibling])
      });
      for (const [key, value] of Object.entries(this.state.links)) {
        if (this.state.links[key].includes(variables._id)) {
          this.state.links[key].push(newSibling._id)
          this.state.links[newSibling._id] = []
          break
        }
      }
    })
    .then(() => {
      this.updateTitleMap()
      this.populateTreeData()
      this.props.history.push("/");
    })
    .then(() => {
      this.saveLinks()
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Legend />
          <GraphUI parentContext={this} />
        </header>
      </div>
    );
  };
}

export default AllNotes;