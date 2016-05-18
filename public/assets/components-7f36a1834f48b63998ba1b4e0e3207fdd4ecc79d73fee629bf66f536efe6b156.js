function convertUTCDateToLocalDate(e){var t=new Date(e.getTime()+60*e.getTimezoneOffset()*1e3),a=e.getTimezoneOffset()/60,s=e.getHours();return t.setHours(s-a),t}function translateBoolean(e){return"true"===e.toString()?"Yes":"No"}var AcceptedTripPasses=React.createClass({displayName:"AcceptedTripPasses",getInitialState:function(){return{data:[],btn:"Decline"}},getDefaultProps:function(){return{data:[],btn:"Decline"}},onHandleDecline:function(e){this.setState({btn:"Declining..."}),$.ajax({url:Routes.trip_pass_decline_path(e),type:"post",success:function(){alert("Please message the user about why you declined."),this.props.updateAll(),this.setState({btn:"Decline"})}.bind(this),error:function(e,t,a){alert("An Error Occured!"),console.error(a.toString()),console.error(e.status),console.error(e.responseText)}.bind(this)})},render:function(){return React.createElement(Trip_Pass_List_One,{btn:this.state.btn,data:this.props.data,handleAccept:this.onHandleAccept,handleDecline:this.onHandleDecline})}}),Trip_Pass_List_One=React.createClass({displayName:"Trip_Pass_List_One",accept_pass:function(e){this.props.handleAccept(e)},decline_pass:function(e){this.props.handleDecline(e)},render:function(){var e=this.props.data.map(function(e){return React.createElement(Trip_Pass_One_Button,{btn:this.props.btn,onPassAccept:this.accept_pass,onPassDecline:this.decline_pass,data:e,key:e.id})},this);return React.createElement("div",{className:"table-reponsive"},React.createElement("table",{className:"tripPassTable table-striped table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"Name"),React.createElement("th",null,"Location"),React.createElement("th",null,"Arrival"),React.createElement("th",null,"Departure"),React.createElement("th",null,"Accepted?"),React.createElement("th",null))),React.createElement("tbody",null,e)))}}),Trip_Pass_One_Button=React.createClass({displayName:"Trip_Pass_One_Button",getInitialState:function(){return{btn:this.props.btn}},handleClick:function(){"Accept"===this.state.btn?(this.props.onPassAccept(this.props.data.id),this.setState({btn:"Accepting..."})):"Decline"===this.state.btn&&(this.props.onPassDecline(this.props.data.id),this.setState({btn:"Declining..."}))},render:function(){return React.createElement("tr",null,React.createElement("td",null,this.props.data.user.name),React.createElement("td",null,this.props.data.location),React.createElement("td",null,this.props.data.dateStart),React.createElement("td",null,this.props.data.dateEnd),React.createElement("td",null,translateBoolean(this.props.data.researcher_accept)),React.createElement("td",null,React.createElement("div",{className:"btn-group",role:"group"},React.createElement("button",{type:"button",onClick:this.handleClick,className:"btn btn-info"},this.state.btn))))}}),Reply=React.createClass({displayName:"Reply",getInitialState:function(){return{text:""}},handleTextChange:function(e){this.setState({text:e.target.value})},handleSubmit:function(e){e.preventDefault();var t=this.state.text.trim();t&&(this.props.onReplySubmit(t),this.setState({text:""}))},render:function(){return React.createElement("div",{className:"form-group"},React.createElement("form",{className:"replyForm",onSubmit:this.handleSubmit},React.createElement("textarea",{rows:"4",required:"true",cols:"50",className:"form-control replyBody",type:"text",id:"body",name:"body",placeholder:"Reply...",value:this.state.text,onChange:this.handleTextChange}),React.createElement("button",{className:"btn btn-default",type:"submit"},this.props.button)))}}),Message=React.createClass({displayName:"Message",render:function(){var e=convertUTCDateToLocalDate(new Date(this.props.data.created_at));return React.createElement("div",{className:"media"},React.createElement("div",{className:"pull-left"},React.createElement("img",{className:"img-circle",height:"55",width:"55",src:this.props.data.sender.avatar.thumb.url})),React.createElement("div",{className:"media-body"},React.createElement("h6",{className:"media-heading"},this.props.data.sender.name," says at ",e.toString()),this.props.data.body))}}),MessageList=React.createClass({displayName:"MessageList",render:function(){var e=this.props.data.map(function(e){return React.createElement("div",{className:"message",key:e.id},React.createElement(Message,{data:e,key:e.id}))});return React.createElement("div",{className:"messageList"},e)}}),Conversation=React.createClass({displayName:"Conversation",getInitialState:function(){return{data:[],button:"Send Message"}},componentDidMount:function(){this.loadMessagesFromServer()},loadMessagesFromServer:function(){$.ajax({url:Routes.conversation_path(this.props.id),dataType:"json",cache:!1,success:function(e){this.setState({data:e})}.bind(this),error:function(e,t,a){console.error(this.props.url,t,a.toString())}.bind(this)})},handleMessageSubmit:function(e){this.setState({button:"Sending..."}),$.ajax({url:Routes.reply_conversation_path(this.props.id),type:"POST",data:{body:e},success:function(){this.setState({button:"Send Message"}),this.loadMessagesFromServer()}.bind(this),error:function(e,t,a){alert("An Error Occured!"),console.error(a.toString()),console.error(e.status),console.error(e.responseText),this.loadMessagesFromServer()}.bind(this)}),this.loadMessagesFromServer()},render:function(){return React.createElement("div",null,React.createElement("div",{className:"panel panel-default"},React.createElement("div",{className:"panel-heading"},this.props.subject),React.createElement("div",{className:"panel-body"},React.createElement("div",{className:"messages"},React.createElement(MessageList,{data:this.state.data})))),React.createElement(Reply,{button:this.state.button,onReplySubmit:this.handleMessageSubmit}))}}),DeclinedTripPasses=React.createClass({displayName:"DeclinedTripPasses",getInitialState:function(){return{data:this.props.data,btn:"Accept"}},onHandleAccept:function(e){this.setState({btn:"Accepting..."}),$.ajax({url:Routes.trip_pass_accept_path(e),type:"post",success:function(){this.setState({btn:"Accept"}),this.props.updateAll()}.bind(this),error:function(e,t,a){alert("An Error Occured!"),console.error(a.toString()),console.error(e.status),console.error(e.responseText)}.bind(this)})},render:function(){return React.createElement(Trip_Pass_List_One,{btn:this.state.btn,data:this.props.data,handleAccept:this.onHandleAccept,handleDecline:this.onHandleDecline})}}),NewTripPasses=React.createClass({displayName:"NewTripPasses",getInitialState:function(){return{data:[],btnAccept:"Accept",btnDecline:"Decline"}},getDefaultProps:function(){return{data:[],btnAccept:"Accept",btnDecline:"Decline"}},onHandleAccept:function(e){this.setState({btnAccept:"Accepting.."}),$.ajax({url:Routes.trip_pass_accept_path(e),type:"post",success:function(){this.props.updateAll()}.bind(this),error:function(e,t,a){alert("An Error Occured!"),console.error(a.toString()),console.error(e.status),console.error(e.responseText)}.bind(this)})},onHandleDecline:function(e){this.setState({btnDecline:"Declining"}),$.ajax({url:Routes.trip_pass_decline_path(e),type:"post",success:function(){alert("Please message the user about why you declined."),this.props.updateAll()}.bind(this),error:function(e,t,a){alert("An Error Occured!"),console.error(a.toString()),console.error(e.status),console.error(e.responseText)}.bind(this)})},render:function(){return React.createElement(Trip_Pass_List,{btnDecline:this.state.btnDecline,btnAccept:this.state.btnAccept,data:this.props.data,handleAccept:this.onHandleAccept,handleDecline:this.onHandleDecline})}}),Trip_Pass_List=React.createClass({displayName:"Trip_Pass_List",accept_pass:function(e){this.props.handleAccept(e)},decline_pass:function(e){this.props.handleDecline(e)},render:function(){var e=this.props.data.map(function(e){return React.createElement(Trip_Pass,{btnDecline:this.props.btnDecline,btnAccept:this.props.btnAccept,onPassAccept:this.accept_pass,onPassDecline:this.decline_pass,data:e,key:e.id})},this);return React.createElement("div",{className:"table-reponsive"},React.createElement("table",{className:"tripPassTable table-striped table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"Name"),React.createElement("th",null,"Location"),React.createElement("th",null,"Arrival"),React.createElement("th",null,"Departure"),React.createElement("th",null,"Accepted?"),React.createElement("th",null))),React.createElement("tbody",null,e)))}}),Trip_Pass=React.createClass({displayName:"Trip_Pass",getInitialState:function(){return{btnAccept:"Accept",btnDecline:"Decline"}},handleAcceptSubmit:function(){this.props.onPassAccept(this.props.data.id),this.setState({btnAccept:"Accepting..."})},handleDeclineSubmit:function(){this.props.onPassDecline(this.props.data.id),this.setState({btnDecline:"Declining..."})},render:function(){return React.createElement("tr",null,React.createElement("td",null,this.props.data.user.name),React.createElement("td",null,this.props.data.location),React.createElement("td",null,this.props.data.dateStart),React.createElement("td",null,this.props.data.dateEnd),React.createElement("td",null,translateBoolean(this.props.data.researcher_accept)),React.createElement("td",null,React.createElement("div",{className:"btn-group",role:"group"},React.createElement("button",{type:"button",onClick:this.handleAcceptSubmit,className:"btn btn-info"},this.state.btnAccept),React.createElement("button",{type:"button",onClick:this.handleDeclineSubmit,classId:this.props.id,"data-target":this.props.id,"data-toggle":"modal",className:"btn btn-default"},this.state.btnDecline))))}}),TripPassBox=React.createClass({displayName:"TripPassBox",getInitialState:function(){return{newPasses:this.props.newPasses,acceptPasses:this.props.acceptPasses,declinePasses:this.props.declinePasses}},componentDidMount:function(){this.getPassesFromServer()},componentWillMount:function(){this.getPassesFromServer()},getPassesFromServer:function(){$.ajax({url:Routes.trip_requests_path(),type:"get",dataType:"json",success:function(e){this.setState({acceptPasses:e.acceptPasses,declinePasses:e.declinePasses,newPasses:e.newPasses})}.bind(this),error:function(e,t){console.error(t.toString()),console.error(e.status),console.error(e.responseText)}.bind(this)})},updateBox:function(){this.getPassesFromServer()},newRender:function(){return 0===this.state.newPasses.length?React.createElement("h4",null,"You don't have any new Trip Requests!"):React.createElement(NewTripPasses,{data:this.state.newPasses,updateAll:this.updateBox})},acceptRender:function(){return 0===this.state.acceptPasses.length?React.createElement("h4",null,"You don't have any accepted Trip Requests!"):React.createElement(AcceptedTripPasses,{data:this.state.acceptPasses,updateAll:this.updateBox})},declineRender:function(){return 0===this.state.declinePasses.length?React.createElement("h4",null,"You don't have any declined Trip Requests!"):React.createElement(DeclinedTripPasses,{data:this.state.declinePasses,updateAll:this.updateBox})},render:function(){return React.createElement("div",{className:"trip_pass_box"},React.createElement("div",{"aria-multiselectable":"true",className:"panel-group",id:"accordion",role:"tablist"},React.createElement("div",{className:"panel panel-default"},React.createElement("div",{className:"panel-heading",id:"headingOne",role:"tab"},React.createElement("h4",{className:"panel-title"},React.createElement("a",{"aria-controls":"collapseOne","aria-expanded":"true","data-parent":"#accordion","data-toggle":"collapse",href:"#collapseOne",role:"button"},React.createElement("i",{className:"fa fa-exclamation-circle"}),"New Trip Requests!"))),React.createElement("div",{"aria-labelledby":"headingOne",className:"panel-collapse collapse in",id:"collapseOne",role:"tabpanel"},React.createElement("div",{className:"panel-body"},this.newRender())))),React.createElement("div",{"aria-multiselectable":"true",className:"panel-group",id:"accordion",role:"tablist"},React.createElement("div",{className:"panel panel-default"},React.createElement("div",{className:"panel-heading",id:"headingTwo",role:"tab"},React.createElement("h4",{className:"panel-title"},React.createElement("a",{"aria-controls":"collapseTwo","aria-expanded":"true","data-parent":"#accordion","data-toggle":"collapse",href:"#collapseTwo",role:"button"},React.createElement("i",{className:"fa fa-check-circle"}),"Accepted Trip Requests!"))),React.createElement("div",{"aria-labelledby":"headingTwo",className:"panel-collapse collapse in",id:"collapseTwo",role:"tabpanel"},React.createElement("div",{className:"panel-body"},this.acceptRender())))),React.createElement("div",{"aria-multiselectable":"true",className:"panel-group",id:"accordion",role:"tablist"},React.createElement("div",{className:"panel panel-default"},React.createElement("div",{className:"panel-heading",id:"headingThree",role:"tab"},React.createElement("h4",{className:"panel-title"},React.createElement("a",{"aria-controls":"collapseThree","aria-expanded":"true","data-parent":"#accordion","data-toggle":"collapse",href:"#collapseThree",role:"button"},React.createElement("i",{className:"fa fa-times-circle"}),"Declined Trip Requests!"))),React.createElement("div",{"aria-labelledby":"headingThree",className:"panel-collapse collapse in",id:"collapseThree",role:"tabpanel"},React.createElement("div",{className:"panel-body"},this.declineRender())))))}});