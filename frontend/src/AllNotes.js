import axios from "axios";
import BarChart from "./BarChart"
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { BsCode } from "react-icons/bs";
import { Container, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";
import { json } from "d3";


class AllNotes extends React.Component {
  state = {
    allNotes: [],
    links: {},
    treeData: {},
    titleMap:{}
  };

  saveLinks(){
    axios
    .post("http://localhost:8000/links", {links: JSON.stringify(this.state.links)})
    .then(res => {
    console.log("saving", res.data)
    console.log("tree data", JSON.stringify(this.state.treeData))
    })
  }

  // updateTitleMap(){
  //   this.state.allNotes.forEach()
  // }
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
        "name": id,
        "size": [100, 100],
        "children": []
      }
    }

    var treeData = {
      "name": id,
      "size": [100, 100],
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
      .post("http://localhost:8000/notes/", {title: "Master", content: "-"})
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
          this.setState({links:links})
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
      console.log("NOTES",this.state.allNotes)
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
  }

  deleteNote({variables}) {
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
      .then(() =>{
        this.populateTreeData()
        this.props.history.push("/")
      })
    })
    .catch(err => {
      console.log(err);
    });
    console.log(this.state.links)
  }

  addChild({variables}) {
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
      console.log("Child added", this.state.links, variables._id)
    })
    .then(() => {
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
      this.populateTreeData()
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err);
    });
    console.log(this.state.links)
  }

  // componentWillUnmount() {
  //   console.log("Links",this.state.links)
  //   axios
  //   .post("http://localhost:8000/links", JSON.stringify(this.state.links))
  //   .then(res => {
  //     console.log(res.data)
  //   })
  // } 

  render() {
    return (
      <div className="App">
        <div className="container m-t-20">
          <h1 className="page-title">All Notes</h1>
          
          <div className="allnotes-page">
            <div>
              <button
                onClick={e => {
                  e.preventDefault();
                  console.log("links2",this.state.links)
                  axios
                  .post("http://localhost:8000/links", {links: JSON.stringify(this.state.links)})
                  .then(res => {
                    console.log("saving", res.data)
                    console.log("tree data", JSON.stringify(this.state.treeData))
                    this.props.history.push("/")
                  })
                }}
              >
                Save
              </button>
              <Container>
                <Row>
                  {this.state.allNotes.map(note => (
                    <Col>
                      <div key={note._id}>
                        <div className="card">
                          <header className="card-header">
                            <p className="card-header-title">{note.title}</p>
                          </header>
                          <div className="card-content">
                            <div className="content">
                              {note.content}
                              <br />
                            </div>
                          </div>
                          <footer className="card-footer">
                            <button
                              onClick={e => {
                                e.preventDefault();
                                this.addChild({ variables: { _id: note._id } });
                                notify.show("Child note was added successfully", "success");
                              }}
                              className="card-footer-item"
                            >
                              <BsChevronDown />
                            </button>
                            <button
                              onClick={e => {
                                e.preventDefault();
                                this.addSibling({ variables: { _id: note._id } });
                                notify.show("Sibling note was added successfully", "success");
                              }}
                              className="card-footer-item"
                            >
                              <BsCode />
                            </button>
                            {/* <button
                              onClick={e => {
                                e.preventDefault();
                                this.linkParent({ variables: { _id: note._id } });
                                notify.show("Note was linked to parent successfully", "success");
                              }}
                              className="card-footer-item"
                            >
                              <BsChevronUp />
                            </button> */}
                          </footer>
                          <footer className="card-footer">
                            <Link to={`note/${note._id}`} className="card-footer-item">
                              Edit
                            </Link>
                            <button
                              onClick={e => {
                                e.preventDefault();
                                this.deleteNote({ variables: { _id: note._id } });
                                notify.show("Note was deleted successfully", "success");
                              }}
                              className="card-footer-item"
                            >
                              Delete
                            </button>
                          </footer>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      {/* // NEW UI STARTS */}
        <header className="App-header">
          <BarChart treeData={this.state.treeData} />
        </header>
      </div>
    );
  };
}

export default AllNotes;
