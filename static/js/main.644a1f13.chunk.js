(this["webpackJsonpart-supply-scraper"]=this["webpackJsonpart-supply-scraper"]||[]).push([[0],{141:function(e,t,n){},164:function(e,t,n){"use strict";n.r(t);var c,r,a,i,s,o,j,d,h,b,u=n(0),l=n.n(u),p=n(16),O=n.n(p),x=n(29),m=(n(141),n(21)),f=n(25),v=n(26),g=n(31),I=n(30),S=n(207),w=n(47),y=n(212),k=n(214),E=n(209),T=n(113),D=n(201),A=n(11),C=n(122),_=n(210),P=n(211),R=n(23),U=n(6),L=function(e){Object(g.a)(n,e);var t=Object(I.a)(n);function n(e){var c;return Object(f.a)(this,n),(c=t.call(this,e)).handleSearchInput=function(e){"Enter"===e.key&&(e.preventDefault(),c.submitSearchInput())},c.submitSearchInput=function(){var e=c.searchInputRef.current.value;c.props.setSearchInput(e),c.forceUpdate()},c.searchInputRef=l.a.createRef(),c}return Object(v.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.recentSearches,c=t.searchOptions;return Object(U.jsx)(N,{id:"navbar",children:Object(U.jsxs)(M,{bg:"light",expand:"lg",children:[Object(U.jsx)(y.a.Brand,{href:"#home",children:"Art-Supply-Scraper"}),Object(U.jsx)(y.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(U.jsxs)(y.a.Collapse,{id:"basic-navbar-nav",children:[Object(U.jsxs)(k.a,{className:"mr-auto",children:[Object(U.jsx)(k.a.Link,{href:"#home",children:"Favorites"}),Object(U.jsxs)(E.a,{title:"Recent Searches",id:"basic-nav-dropdown",children:[Object(U.jsx)(E.a.Item,{href:"#action/3.1",children:n[0]}),Object(U.jsx)(E.a.Item,{href:"#action/3.2",children:n[1]}),Object(U.jsx)(E.a.Item,{href:"#action/3.3",children:n[2]})]})]}),Object(U.jsx)(D.a,{theme:F,children:Object(U.jsx)(B,{id:"search-options",options:c,getOptionLabel:function(e){return e.name},renderInput:function(t){return Object(U.jsx)(_.a,Object(w.a)(Object(w.a)({},t),{},{color:"primary",onKeyDown:e.handleSearchInput,inputRef:e.searchInputRef}))}})}),Object(U.jsx)(H,{variant:"outline-success",onClick:this.submitSearchInput,children:"Search"})]})]})})}}]),n}(u.Component),N=Object(R.a)(S.a)(c||(c=Object(m.a)(["\n  width: 100%;\n  max-width: 100%;\n  margin: 0;\n  padding-left: 0;\n  padding-right: 0;\n"]))),M=Object(R.a)(y.a)(r||(r=Object(m.a)(["\n  width: calc(15px + 100%);\n  border-bottom: 2px solid #eee;\n"]))),H=Object(R.a)(T.a)(a||(a=Object(m.a)(["\n  color: #7e57c2;\n  height: 50%;\n  margin-right: 15px;\n  border: 1px solid #7e57c2;\n  &:hover, &:active, &:focus {\n    background-color: #7e57c2 !important;\n    border: 1px solid #7e57c2 !important;\n    box-shadow: none !important;\n  }\n"]))),B=Object(A.a)({root:{padding:10,height:50,width:300}})(P.a),F=Object(C.a)({palette:{primary:{main:"#7e57c2"}}}),J={setSearchInput:function(e){return{type:"SET_SEARCH_INPUT",searchInput:e}}},K=Object(x.b)((function(e){return{recentSearches:e.recentSearches,searchOptions:e.searchOptions}}),J)(L),q=n(208),z=n(57),G=function(e){Object(g.a)(n,e);var t=Object(I.a)(n);function n(e){return Object(f.a)(this,n),t.call(this,e)}return Object(v.a)(n,[{key:"render",value:function(){return Object(U.jsx)(Q,{id:"table",children:Object(U.jsxs)(q.a,{striped:!0,bordered:!0,hover:!0,children:[Object(U.jsx)("thead",{children:Object(U.jsxs)("tr",{children:[Object(U.jsx)("th",{children:"Favorite"}),Object(U.jsx)("th",{children:"Product Name"}),Object(U.jsx)("th",{children:"Store"}),Object(U.jsx)("th",{children:"Stock"}),Object(U.jsx)("th",{children:"Price"})]})}),Object(U.jsxs)("tbody",{children:[Object(U.jsxs)("tr",{children:[Object(U.jsx)("td",{children:Object(U.jsx)(z.a,{})}),Object(U.jsx)("td",{children:this.props.searchInput}),Object(U.jsx)("td",{children:"Todo"}),Object(U.jsx)("td",{children:"Todo"}),Object(U.jsx)("td",{children:"Todo"})]}),Object(U.jsxs)("tr",{children:[Object(U.jsx)("td",{children:Object(U.jsx)(z.a,{})}),Object(U.jsx)("td",{children:this.props.searchInput}),Object(U.jsx)("td",{children:"Todo"}),Object(U.jsx)("td",{children:"Todo"}),Object(U.jsx)("td",{children:"Todo"})]}),Object(U.jsxs)("tr",{children:[Object(U.jsx)("td",{children:Object(U.jsx)(z.a,{})}),Object(U.jsx)("td",{children:this.props.searchInput}),Object(U.jsx)("td",{children:"Todo"}),Object(U.jsx)("td",{children:"Todo"}),Object(U.jsx)("td",{children:"Todo"})]})]})]})})}}]),n}(u.Component),Q=Object(R.a)(S.a)(i||(i=Object(m.a)(["\n  width: 50%;\n  max-width: 50%;\n  margin: 0;\n  padding-left: 0;\n  padding-right: 0;\n"]))),V=Object(x.b)((function(e){return{searchInput:e.searchInput}}))(G),W=n(94),X=function(e){Object(g.a)(n,e);var t=Object(I.a)(n);function n(e){return Object(f.a)(this,n),t.call(this,e)}return Object(v.a)(n,[{key:"render",value:function(){return Object(U.jsx)(Y,{id:"graph",children:Object(U.jsx)(W.b,{height:200,width:200,colorType:"category",colorDomain:[0],colorRange:["#7e57c2"],children:Object(U.jsx)(W.a,{data:this.props.graphData})})})}}]),n}(u.Component),Y=Object(R.a)(S.a)(s||(s=Object(m.a)(["\n  width: 50%;\n  max-width: 50%;\n  margin: 0;\n  padding-left: 0;\n  padding-right: 0;\n"]))),Z=Object(x.b)((function(e){return{graphData:e.graphData}}))(X),$=n(213),ee=n(120),te=function(e){Object(g.a)(n,e);var t=Object(I.a)(n);function n(e){var c;return Object(f.a)(this,n),(c=t.call(this,e)).submitEmail=function(e){"Enter"===e.key&&(e.preventDefault(),c.handleEmail())},c.handleEmail=function(){var e=c.refs.email.value;c.props.setEmail(e)},c}return Object(v.a)(n,[{key:"render",value:function(){var e;return this.props.emailSuccess&&(e=Object(U.jsx)(z.a,{})),Object(U.jsxs)(ne,{id:"contact",children:[Object(U.jsxs)($.a,{onKeyDown:this.submitEmail,inline:!0,children:[Object(U.jsx)(ce,{type:"email",placeholder:"Enter email",ref:"email"}),e]}),Object(U.jsx)(re,{variant:"outline-success",onClick:this.handleEmail,children:"Submit"})]})}}]),n}(u.Component),ne=Object(R.a)(S.a)(o||(o=Object(m.a)(["\n  width: 50%;\n  max-width: 50%;\n  margin: 0;\n  padding-left: 0;\n  padding-right: 0;\n"]))),ce=Object(R.a)(ee.a)(j||(j=Object(m.a)(["\n  &:active, &:focus {\n    border: 1px solid #7e57c2 !important;\n  }\n"]))),re=Object(R.a)(T.a)(d||(d=Object(m.a)(["\n  color: #7e57c2;\n  border: 1px solid #7e57c2;\n  margin-top: 5px;\n  &:hover, &:active, &:focus {\n    background-color: #7e57c2 !important;\n    border: 1px solid #7e57c2 !important;\n    box-shadow: none !important;\n  }\n"]))),ae={setEmail:function(e){return{type:"SET_EMAIL",email:e}}},ie=Object(x.b)((function(e){return{emailSuccess:e.emailSuccess}}),ae)(te),se=function(e){Object(g.a)(n,e);var t=Object(I.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(v.a)(n,[{key:"render",value:function(){return Object(U.jsxs)(oe,{children:[Object(U.jsx)(K,{}),Object(U.jsxs)(je,{children:[Object(U.jsx)(Z,{}),Object(U.jsx)(V,{})]}),Object(U.jsx)(je,{children:Object(U.jsx)(ie,{})})]})}}]),n}(u.Component),oe=R.a.div(h||(h=Object(m.a)(["\n  width: 100%;\n  max-width: 100%;\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  background-color: white;\n"]))),je=Object(R.a)(S.a)(b||(b=Object(m.a)(["\n  width: 100%;\n  max-width: 100%;\n  padding: 15px;\n  display: flex;\n  flex-direction: row;\n"]))),de=se,he=n(65),be=n(123),ue=n(24),le=n.n(ue),pe=n(49),Oe=(n(121),le.a.mark(ge)),xe=le.a.mark(Ie),me=le.a.mark(Se),fe=le.a.mark(we),ve=function(e){return e.recentSearches};function ge(e){var t,n,c;return le.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(pe.c)(ve);case 2:for(t=r.sent,n=t.length,c=n;c>0;c--)t[c]=t[c-1];return t[0]=e.searchInput,t=t.slice(0,3),r.next=9,Object(pe.b)({type:"SEARCH_INPUT_UPDATED",searchInput:e.searchInput,recentSearches:t});case 9:case"end":return r.stop()}}),Oe)}function Ie(e){return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(pe.b)({type:"EMAIL_UPDATED"});case 2:case"end":return e.stop()}}),xe)}function Se(){return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(pe.d)("SET_SEARCH_INPUT",ge);case 2:return e.next=4,Object(pe.d)("SET_EMAIL",Ie);case 4:case"end":return e.stop()}}),me)}function we(){return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(pe.a)([Se()]);case 2:case"end":return e.stop()}}),fe)}var ye={graphData:[{x:1,y:2},{x:2,y:3},{x:3,y:4},{x:4,y:5}],tableData:[],searchInput:"copic marker",selectedProduct:"",searchOptions:[{name:"copic marker 36 set"},{name:"copic marker 72 set"},{name:"copic marker 128 set"},{name:"prismacolour marker 36 set"},{name:"promarker 12 set"},{name:"promarker 36 set"}],favourites:[],recentSearches:[],emailSuccess:!1},ke=Object(be.a)(),Ee=Object(he.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ye,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEARCH_INPUT_UPDATED":return Object(w.a)(Object(w.a)({},e),{},{searchInput:t.searchInput});case"EMAIL_UPDATED":return Object(w.a)(Object(w.a)({},e),{},{emailSuccess:!0});default:return e}}),Object(he.a)(ke));ke.run(we);var Te=Ee;O.a.render(Object(U.jsx)(x.a,{store:Te,children:Object(U.jsx)(l.a.StrictMode,{children:Object(U.jsx)(de,{})})}),document.getElementById("root"))}},[[164,1,2]]]);
//# sourceMappingURL=main.644a1f13.chunk.js.map