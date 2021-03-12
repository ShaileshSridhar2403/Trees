import axios from "axios";
import GraphUI from "./GraphUI"
import React from "react";


class AllNotes extends React.Component {
  state = {
    allNotes: [],
    links: {},
    treeData: {},
    titleMap: {}
  };

  saveLinks() {
    axios
      .post("http://localhost:8000/links", { links: JSON.stringify(this.state.links) })
      .then(res => {
        console.log("saving", res.data)
        console.log("tree data", JSON.stringify(this.state.treeData))
      })
  }

  updateTitleMap() {
    console.log("titleCalled")
    var titleMap = {}
    this.state.allNotes.forEach(note => {
      titleMap[note._id] = note.title
      console.log("title", note.title)
    })
    this.setState({ titleMap: titleMap })
  }

  // driver function
  populateTreeData() {
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
        .post("http://localhost:8000/notes/", { title: "Master", content: "-" })
        .then(() => {
          axios
            .get("http://localhost:8000/notes")
            .then(res => {
              const notes = res.data;
              var rootLink = res.data[0]._id
              this.setState({
                allNotes: notes,
              });
              var links = this.state.links
              links[rootLink] = []
              this.setState({ links: links })
              console.log("if hello", this.state.links)
            })
            .then(() => {
              console.log("links", this.state.links)
              this.populateTreeData()
            })
        })
    }
    else {
      axios
        .get("http://localhost:8000/links")
        .then(res => {
          const links = JSON.parse(res.data[0].links)
          this.setState({
            links: links,
          });
          console.log("else hello", this.state.links)
        })
        .then(() => {
          console.log("links", this.state.links)
          this.populateTreeData()
        })
    }
  }

  componentDidMount() {
    console.log("Mounting")
    axios
      .get("http://localhost:8000/notes")
      .then(res => {
        const notes = res.data;
        this.setState({
          allNotes: notes,
        });
        this.updateTitleMap()
        console.log("NOTES", this.state.allNotes, this.state.titleMap)
      })
      .then(() => {
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
  }

  deleteNote({ variables }) {
    axios
      .delete("http://localhost:8000/notes/" + variables._id)
      .then(res => {
        console.log("deleted", res.message)
        axios
          .get("http://localhost:8000/notes")
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
            this.deleteLinks(variables._id)

          })
          // this.setState({
          //   allNotes: this.state.allNotes.filter(note => (note._id in res.message.deletedArray) === false)
          // })
          .then(() => {
            this.saveLinks()
          })
          .then(() => {
            this.populateTreeData()
            this.props.history.push("/")
          })
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.links)
  }

  addChild({ variables }) {
    axios
      .get("http://localhost:8000/notes/addChild/" + variables._id)
      .then(res => {
        const newChild = res.data;
        this.setState({
          allNotes: this.state.allNotes.concat([newChild])
        });
        console.log("Adding child", this.state.links, variables._id)
        this.state.links[variables._id].push(newChild._id)
        this.state.links[newChild._id] = []
        this.setState({ links: this.state.links })
        console.log("Child added", this.state.links, variables._id)
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
    console.log(this.state.links)
  }

  addSibling({ variables }) {
    axios
      .get("http://localhost:8000/notes/addSibling/" + variables._id)
      .then(res => {
        const newSibling = res.data;
        this.setState({
          allNotes: this.state.allNotes.concat([newSibling])
        });
        for (const [key, value] of Object.entries(this.state.links)) {
          if (this.state.links[key].includes(variables._id)) {
            console.log("Adding sibling", this.state.links, variables._id)
            this.state.links[key].push(newSibling._id)
            this.state.links[newSibling._id] = []
            console.log("Sibling added", this.state.links, variables._id)
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
    console.log(this.state.links)
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