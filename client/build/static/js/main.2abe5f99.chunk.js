(window["webpackJsonptrees-ui"]=window["webpackJsonptrees-ui"]||[]).push([[0],{170:function(t,e,a){t.exports=a(308)},180:function(t,e,a){},305:function(t,e,a){},306:function(t,e,a){},307:function(t,e,a){},308:function(t,e,a){"use strict";a.r(e);var n=a(0),l=a.n(n),i=a(28),o=a.n(i),r=a(41),s=a.n(r),c=(a(180),a(18)),u=a(1),d=(a(181),a(24)),h=a(6),m=a(7),f=a(9),p=a(8),v=a(3),g=a.n(v),b=a(4),k=a(99);var y=function(t){var e=t.parentContext,a=function(t,e){var a=l.a.useRef();return l.a.useEffect((function(){return t(b.c(a.current)),function(){}}),e),a}((function(t){var a=window.innerWidth,n=window.innerHeight;b.d("g > *").remove();var l=t.attr("width",a).attr("height",n).append("g").attr("transform","translate(".concat(a/2,",100)")),i=0,o=b.b(e.state.treeData,(function(t){return t.children}));console.log("Fancy UI",o),void 0!=o.children&&(o.children.forEach((function t(e){e.children&&(e._children=e.children,e._children.forEach(t),e.children=null)})),o.x0=0,o.y0=0);var r=k.a();!function t(a){var n=r(o),s=n.descendants(),c=n.descendants().slice(1),u=l.selectAll("g.node").data(s,(function(t){return t.id||(t.id=++i)})),d=u.enter().append("g").attr("class","node").attr("transform",(function(t){return"translate("+a.x0+","+a.y0+")"}));d.append("circle").attr("class","node").attr("r",1e-6).style("fill",(function(t){return t._children?"lightsteelblue":"#fff"})),d.append("text").attr("pointer-events","none").attr("dy","0.35em").text((function(t){return t.data.name})).attr("text-anchor","middle");var h=0,m=!1,f=d.merge(u).attr("fill","#fff").attr("stroke","black").attr("stroke-width","3px;").style("font","12px consolas").on("click",(function(t,e){var a=this;h=setTimeout((function(){m||function t(e,a,n){if(f.select("#button"+n.data.id).empty()){var l=b.a().innerRadius(55).outerRadius(75).startAngle(0).endAngle(30*Math.PI/180),i=b.a().innerRadius(55).outerRadius(75).startAngle(35*Math.PI/180).endAngle(65*Math.PI/180),o=b.a().innerRadius(55).outerRadius(75).startAngle(70*Math.PI/180).endAngle(100*Math.PI/180),r=b.a().innerRadius(55).outerRadius(75).startAngle(105*Math.PI/180).endAngle(135*Math.PI/180);b.c(e).append("path").attr("id","button"+n.data.id).attr("d",l).attr("cursor","pointer").attr("fill","#7FFFD4").on("click",p),b.c(e).append("path").attr("id","button"+n.data.id).attr("d",i).attr("cursor","pointer").attr("fill","#FF00FF").on("click",v),b.c(e).append("path").attr("id","button"+n.data.id).attr("d",o).attr("cursor","pointer").attr("fill","#00FF00").on("click",g),b.c(e).append("path").attr("id","button"+n.data.id).attr("d",r).attr("cursor","pointer").attr("fill","#FF6347").on("click",k)}else f.selectAll("#button"+n.data.id).remove(),b.c(e).on("click",(function(e,a){var n=this;h=setTimeout((function(){m||t(n,e,a),m=!1}),200)}))}(a,0,e),m=!1}),200)})).on("dblclick",(function(t,e){clearTimeout(h),m=!0,C(t,e)}));function p(t,a){alert("add child"),e.addChild({variables:{_id:a.data.id}}),t.stopPropagation()}function v(t,a){alert("add sibling"),e.addSibling({variables:{_id:a.data.id}}),t.stopPropagation()}function g(t,e){localStorage.setItem("current_id",e.data.id),console.log("Accessing from graph ui",e.data.id),alert("edit"),window.location.href="/",window.location.href="/editorapp2",t.stopPropagation()}function k(t,a){alert("delete"),e.deleteNote({variables:{_id:a.data.id}}),t.stopPropagation()}f.transition().duration(750).attr("transform",(function(t,e,a){var n=b.c(this).datum();return"translate("+n.x+","+n.y+")"})),f.select("circle.node").attr("r",50).style("fill",(function(t){return t._children?"lightsteelblue":"#fff"})).style("-webkit-touch-callout","none").style("-webkit-user-select","none").style("-khtml-user-select","none").style("-moz-user-select","none").style("-ms-user-select","none").style("user-select","none").attr("cursor","pointer");var y=u.exit().transition().duration(750).attr("transform",(function(t,e,n){b.c(this).datum();return"translate("+a.x+","+a.y+")"})).remove();y.select("circle").attr("r",1e-6),y.select("text").style("fill-opacity",1e-6);var E=l.selectAll("path.link").data(c,(function(t){return t.id}));E.enter().insert("path","g").attr("class","link").attr("d",(function(t){var e={x:a.x0,y:a.y0};return N(e,e)})).merge(E).attr("fill","none").attr("stroke","#ccc").attr("stroke-width","2px").transition().duration(750).attr("d",(function(t){return N(t,t.parent)}));E.exit().transition().duration(750).attr("d",(function(t,e,n){b.c(this).datum();var l={x:a.x,y:a.y};return N(l,l)})).remove();function N(t,e){return"M ".concat(t.x," ").concat(t.y,"\n                  C ").concat((t.x+e.x)/2," ").concat(t.y,",\n                  ").concat((t.x+e.x)/2," ").concat(e.y,",\n                  ").concat(e.x," ").concat(e.y)}function C(e,a){a.children?(a._children=a.children,a.children=null):(a.children=a._children,a._children=null),t(a)}s.forEach((function(t){t.x0=t.x,t.y0=t.y}))}(o)}),[e.state.treeData]);return l.a.createElement("svg",{ref:a,style:{height:1e3,width:"100%",marginRight:"0px",marginLeft:"0px"}})},E=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(){var t;Object(h.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={allNotes:[],links:{},treeData:{},titleMap:{}},t}return Object(m.a)(a,[{key:"saveLinks",value:function(){var t=this;g.a.post("/api/links",{links:JSON.stringify(this.state.links)}).then((function(e){console.log("saving",e.data),console.log("tree data",JSON.stringify(t.state.treeData))}))}},{key:"updateTitleMap",value:function(){var t={};this.state.allNotes.forEach((function(e){t[e._id]=e.title})),this.setState({titleMap:t})}},{key:"populateTreeData",value:function(){if(0!=Object.keys(this.state.links).length){var t=this.recurseTreeData(this.state.links,Object.keys(this.state.links)[0]);this.setState({treeData:t})}}},{key:"recurseTreeData",value:function(t,e){var a=this;if(0==t[e].length)return{name:this.state.titleMap[e],id:e,size:[150,150],children:[]};var n={name:this.state.titleMap[e],id:e,size:[150,150],children:[]};return t[e].forEach((function(e){n.children.push(a.recurseTreeData(t,e))})),n}},{key:"init",value:function(){var t=this;0==this.state.allNotes.length?(console.log("initializing..."),g.a.post("/api/notes",{title:"Master",content:"-"}).then((function(){g.a.get("/api/notes").then((function(e){var a=e.data,n=e.data[0]._id;t.setState({allNotes:a});var l=t.state.links;l[n]=[],t.setState({links:l})})).then((function(){t.updateTitleMap(),t.populateTreeData()}))}))):g.a.get("/api/links").then((function(e){var a=JSON.parse(e.data[0].links);t.setState({links:a})})).then((function(){t.updateTitleMap(),t.populateTreeData()}))}},{key:"componentDidMount",value:function(){var t=this;g.a.get("/api/notes").then((function(e){console.log("HEYYY");var a=e.data;t.setState({allNotes:a}),t.updateTitleMap()})).then((function(){t.init()}))}},{key:"deleteLinks",value:function(t){var e=this;void 0!==this.state.links[t]&&(0==this.state.links[t].length||this.state.links[t].forEach((function(t){e.deleteLinks(t)})),delete this.state.links[t],this.setState({links:this.state.links}))}},{key:"deleteNote",value:function(t){var e=this,a=t.variables;g.a.delete("/api/notes"+a._id).then((function(){g.a.get("/api/notes").then((function(t){var n=t.data;e.setState({allNotes:n});for(var l=0,i=Object.entries(e.state.links);l<i.length;l++){var o=Object(d.a)(i[l],2),r=o[0];o[1];if(e.state.links[r].includes(a._id)){var s=e.state.links[r].indexOf(a._id);if(s>-1){e.state.links[r].splice(s,1);break}}}})).then((function(){e.deleteLinks(a._id),e.saveLinks()})).then((function(){void 0===e.state.AllNotes&&e.init()})).then((function(){e.updateTitleMap(),e.populateTreeData(),e.props.history.push("/")}))})).catch((function(t){console.log(t)}))}},{key:"addChild",value:function(t){var e=this,a=t.variables;g.a.get("/api/notes/addChild/"+a._id).then((function(t){var n=t.data;e.setState({allNotes:e.state.allNotes.concat([n])}),e.state.links[a._id].push(n._id),e.state.links[n._id]=[],e.setState({links:e.state.links})})).then((function(){e.updateTitleMap(),e.populateTreeData(),e.props.history.push("/")})).then((function(){e.saveLinks()})).catch((function(t){console.log(t)}))}},{key:"addSibling",value:function(t){var e=this,a=t.variables;g.a.get("/api/notes/addSibling/"+a._id).then((function(t){var n=t.data;e.setState({allNotes:e.state.allNotes.concat([n])});for(var l=0,i=Object.entries(e.state.links);l<i.length;l++){var o=Object(d.a)(i[l],2),r=o[0];o[1];if(e.state.links[r].includes(a._id)){e.state.links[r].push(n._id),e.state.links[n._id]=[];break}}})).then((function(){e.saveLinks()})).then((function(){e.updateTitleMap(),e.populateTreeData(),e.props.history.push("/")})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement(y,{parentContext:this})))}}]),a}(l.a.Component),N=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(){var t;Object(h.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={title:"",content:""},t}return Object(m.a)(a,[{key:"setTitle",value:function(t){this.setState({title:t})}},{key:"setContent",value:function(t){this.setState({content:t})}},{key:"createNote",value:function(t){var e=this,a=t.variables,n={title:a.title,content:a.content};g.a.post("/api/notes",n).then((function(t){e.props.history.push("/")}))}},{key:"render",value:function(){var t=this;return console.log("render is called"),l.a.createElement("div",{className:"container m-t-20"},l.a.createElement("h1",{className:"page-title"},"New Note"),l.a.createElement("div",{className:"newnote-page m-t-20"},l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t.createNote({variables:{title:t.state.title,content:t.state.content}})}},l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Note Title"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",name:"title",type:"text",placeholder:"Note Title",value:this.state.title,onChange:function(e){return t.setTitle(e.target.value)}}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Note Content"),l.a.createElement("div",{className:"control"},l.a.createElement("textarea",{className:"textarea",name:"content",rows:"10",placeholder:"Note Content here...",value:this.state.content,onChange:function(e){return t.setContent(e.target.value)}}))),l.a.createElement("div",{className:"field"},l.a.createElement("div",{className:"control"},l.a.createElement("button",{className:"button is-link"},"Submit"))))))}}]),a}(l.a.Component),C=Object(u.e)(N),_=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(){var t;Object(h.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={_id:"",title:"",content:""},t}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var t=this;g.a.get("/api/notes"+this.props.match.params.id).then((function(e){t.setState({_id:e.data._id,title:e.data.title,content:e.data.content})}))}},{key:"setTitle",value:function(t){this.setState({title:t})}},{key:"setContent",value:function(t){this.setState({content:t})}},{key:"updateNote",value:function(t){var e=this,a=t.variables,n={title:a.title,content:a.content};g.a.put("/api/notes/"+a._id,n).then((function(t){console.log(t.data),e.props.history.push("/")}))}},{key:"render",value:function(){var t=this;return l.a.createElement("div",{className:"container m-t-20"},l.a.createElement("h1",{className:"page-title"},"Edit Note"),l.a.createElement("div",{className:"newnote-page m-t-20"},l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t.updateNote({variables:{_id:t.state._id,title:t.state.title,content:t.state.content}}),r.notify.show("Note was edited successfully","success")}},l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Note Title"),l.a.createElement("div",{className:"control"},l.a.createElement("input",{className:"input",type:"text",name:"title",placeholder:"Note Title",defaultValue:this.state.title,onChange:function(e){return t.setTitle(e.target.value)},required:!0}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"label"},"Note Content"),l.a.createElement("div",{className:"control"},l.a.createElement("textarea",{className:"textarea",rows:"10",name:"content",type:"text",placeholder:"Note Content here...",value:this.state.content,onChange:function(e){return t.setContent(e.target.value)},required:!0}))),l.a.createElement("div",{className:"field"},l.a.createElement("div",{className:"control"},l.a.createElement("button",{className:"button is-link"},"Submit"))))))}}]),a}(l.a.Component),x=(Object(u.e)(_),a(16)),w=a(17),S=a.n(w),O=(a(96),a(304),a(305),function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(h.a)(this,a),(n=e.call(this,t)).updateNote=function(){var t={title:n.state.title||"title",content:n.state.bodyContent};g.a.put("/api/notes/"+n.state._id,t).then((function(t){console.log(t.data)}))},n.loadText=function(){console.log("contents loadText",n.state.bodyContent),n.quillRef_body.setContents(JSON.parse(n.state.bodyContent)),n.quillRef_title.setContents(JSON.parse(n.state.title))},n.quillRef_body=null,n.reactQuillRef_body=null,n.quillRef_title=null,n.reactQuillRef_title=null,n.state={_id:"",title:"",titleContent:"",bodyContent:"",theme:"snow"},n.handleBodyChange=n.handleBodyChange.bind(Object(x.a)(n)),n.handleTitleChange=n.handleTitleChange.bind(Object(x.a)(n)),n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var t=this;console.log("Logging 1");var e=localStorage.getItem("current_id");console.log("Accessing id for",e),this.quillRef_body=this.reactQuillRef_body.getEditor(),this.quillRef_title=this.reactQuillRef_title.getEditor(),g.a.get("/api/notes/"+e).then((function(e){t.setState({_id:e.data._id,title:e.data.title,bodyContent:e.data.content}),console.log("contents 2",e.data.content)})).then((function(){t.loadText()}))}},{key:"handleBodyChange",value:function(t,e,a,n){this.state.bodyContent=JSON.stringify(n.getContents())}},{key:"handleTitleChange",value:function(t,e,a,n){this.state.title=JSON.stringify(n.getContents())}},{key:"render",value:function(){var t=this;return l.a.createElement("div",null,l.a.createElement(S.a,{ref:function(e){t.reactQuillRef_title=e},id:"title",theme:"bubble",onChange:this.handleTitleChange,modules:a.modules,formats:a.formats}),l.a.createElement(S.a,{ref:function(e){t.reactQuillRef_body=e},theme:this.state.theme,onChange:this.handleBodyChange,modules:a.modules,formats:a.formats}),l.a.createElement("button",{id:"save",onClick:this.updateNote},"Save"))}}]),a}(l.a.Component));O.modules={toolbar:[[{header:"1"},{header:"2"},{font:[]}],[{size:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image","video"],["clean"]],clipboard:{matchVisual:!1}},O.formats=["header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video"];var T=O,j=(a(306),function(){return l.a.createElement("div",null,l.a.createElement("span",null,"\u2003\u2003\u2003\u2003\u2003Save"))});var A=function(){return l.a.createElement("div",{id:"toolbar"},l.a.createElement("select",{className:"ql-font"},l.a.createElement("option",{value:"arial",selected:!0},"Arial"),l.a.createElement("option",{value:"comic-sans"},"Comic Sans"),l.a.createElement("option",{value:"courier-new"},"Courier New"),l.a.createElement("option",{value:"georgia"},"Georgia"),l.a.createElement("option",{value:"helvetica"},"Helvetica"),l.a.createElement("option",{value:"lucida"},"Lucida")),l.a.createElement("select",{className:"ql-size"},l.a.createElement("option",{value:"extra-small"},"Small"),l.a.createElement("option",{value:"small"},"Normal"),l.a.createElement("option",{value:"medium",selected:!0},"Large"),l.a.createElement("option",{value:"large"},"Huge")),l.a.createElement("select",{className:"ql-bold"}),l.a.createElement("select",{className:"ql-align"}),l.a.createElement("select",{className:"ql-color"}),l.a.createElement("select",{className:"ql-background"}),l.a.createElement("button",{className:"ql-clean"}),l.a.createElement("button",{className:"ql-insertHeart"},l.a.createElement(j,null)))},M=w.Quill.import("formats/size");M.whitelist=["extra-small","small","medium","large"],w.Quill.register(M,!0);var q=w.Quill.import("formats/font");q.whitelist=["arial","comic-sans","courier-new","georgia","helvetica","lucida"],w.Quill.register(q,!0);var R=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(){var t;Object(h.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={editorHtml:""},t.handleChange=function(e){t.setState({editorHtml:e})},t}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"text-editor"},l.a.createElement(A,null),l.a.createElement(S.a,{value:this.state.editorHtml,onChange:this.handleChange,placeholder:this.props.placeholder,modules:a.modules,formats:a.formats}))}}]),a}(l.a.Component);R.modules={toolbar:{container:"#toolbar",handlers:{insertHeart:function(){var t=this.quill.getSelection().index;this.quill.insertText(t,"\u2665"),this.quill.setSelection(t+1)}}}},R.formats=["header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","color"];var D=R;a(307);var F=function(){return l.a.createElement(c.a,null,l.a.createElement("div",null,l.a.createElement("nav",{className:"navbar App-header",role:"navigation","aria-label":"main navigation"},l.a.createElement("div",{className:"navbar-brand"},l.a.createElement(c.b,{to:"/",className:"navbar-item"},"Trees")),l.a.createElement("div",{className:"navbar-end"},l.a.createElement(c.b,{to:"/",className:"navbar-item"},"All Notes"),l.a.createElement(c.b,{to:"/editorapp2",className:"navbar-item"},"New Note"))),l.a.createElement(u.a,{exact:!0,path:"/",component:E}),l.a.createElement(u.a,{path:"/newnote",component:C}),l.a.createElement(u.a,{path:"/editorapp2",component:T}),l.a.createElement(u.a,{path:"/editorapp",component:D})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement("div",null,l.a.createElement(s.a,null),l.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[170,1,2]]]);
//# sourceMappingURL=main.2abe5f99.chunk.js.map