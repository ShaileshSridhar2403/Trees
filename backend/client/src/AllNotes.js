import axios from "axios";
import GraphUI from "./GraphUI"
import React from "react";


class AllNotes extends React.Component {
  state = {
    allNotes: [],
    links: {},
    treeData: {},
    titleMap:{}
  };

  saveLinks(){
    axios
    .post("api/links", {links: JSON.stringify(this.state.links)})
    .then(res => {
    console.log("saving", res.data)
    console.log("tree data", JSON.stringify(this.state.treeData))
    })
  }

  updateTitleMap(){
    var titleMap = {}
    this.state.allNotes.forEach(note => {
      titleMap[note._id] = note.title
    })
    this.setState({titleMap:titleMap})
  }
  // driver function
  populateTreeData() {
    if (Object.keys(this.state.links).length == 0)return
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
        "size": [150, 150],
        "children": []
      }
    }

    var treeData = {
      "name": this.state.titleMap[id],
      "id": id,
      "size": [150, 150],
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
      axios
      .post("api/notes/", {title: "Master", content: "-"})
      .then(() => {
        axios
        .get("api/notes")
        .then(res => {
          const notes = res.data;
          var rootLink = res.data[0]._id
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
      })
    }
    else {
      axios
      .get("api/links")
      .then(res => {
        const links = JSON.parse(res.data[0].links)
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
    .get("api/notes")
    .then(res => {
      const notes = res.data;
      this.setState({ 
        allNotes: notes,
      });
      this.updateTitleMap()
    })
    .then(() => {
      this.init()
    })
  }

  deleteLinks(id){
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
    this.setState({links:this.state.links})
  }

  deleteNote({variables}) {
    axios
    .delete("api/notes/" + variables._id)
    .then(() => {
      axios
      .get("api/notes")
      .then(res => {
        const notes = res.data;
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
      })
      .then(() => {
        this.deleteLinks(variables._id)
        this.saveLinks()
      })
      .then(() => {
        if(this.state.AllNotes === undefined)this.init()
      })
      .then(() =>{
        this.updateTitleMap()
        this.populateTreeData()
        this.props.history.push("/")
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  addChild({variables}) {
    axios
    .get("api/notes/addChild/" + variables._id)
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
    .get("api/notes/addSibling/" + variables._id)
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
      this.saveLinks()
    })
    .then(() => {
      this.updateTitleMap()
      this.populateTreeData()
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GraphUI parentContext={this} />
        </header>
      </div>
    );
  };
}

export default AllNotes;