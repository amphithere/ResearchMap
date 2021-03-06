var AcceptedTripPasses = React.createClass({
  getInitialState: function(){
    return {data: [], btn: 'Decline'};
  },
  getDefaultProps: function(){
    return {data:[], btn: 'Decline'};
  },
  onHandleDecline: function(id){
    this.setState({btn: 'Declining...'});
    $.ajax({
      url: Routes.trip_pass_decline_path(id),
      type: 'post',
      success: function(data){
        alert("Please message the user about why you declined.");
        this.props.updateAll();
        this.setState({btn: 'Decline'});
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
      }.bind(this)
    });
  },
  render: function(){
    return(
      <Trip_Pass_List_One btn = {this.state.btn} data={this.props.data} handleAccept = {this.onHandleAccept} handleDecline = {this.onHandleDecline}/>
    );
  }
});

var Trip_Pass_List_One = React.createClass({
  accept_pass: function(id){
    this.props.handleAccept(id);
  },
  decline_pass: function(id){
    this.props.handleDecline(id);
  },
  render: function(){
    var tripNodes = this.props.data.map(function(trip){
      return (
          <Trip_Pass_One_Button btn = {this.props.btn} onPassAccept = {this.accept_pass} onPassDecline = {this.decline_pass}  data = {trip} key = {trip.id} />
      );
    }, this);
    return (
      <div className = "table-reponsive">
          <table className = 'tripPassTable table-striped table-hover'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Accepted?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tripNodes}
            </tbody>
          </table>
      </div>
    );
  }
});

var Trip_Pass_One_Button = React.createClass({
  getInitialState: function(){
    return {btn: this.props.btn};
  },
  handleClick: function (){
    if (this.state.btn === 'Accept'){
        this.props.onPassAccept(this.props.data.id);
        this.setState({btn: "Accepting..."});
    }
    else if (this.state.btn === 'Decline'){
      this.props.onPassDecline(this.props.data.id);
      this.setState({btn: "Declining..."});
    }
  },
  render: function(){
    return(
        <tr>
          <td>
            {this.props.data.user.name}
          </td>
          <td>
            {this.props.data.location}
          </td>
          <td>
            {this.props.data.dateStart}
          </td>
          <td>
            {this.props.data.dateEnd}
          </td>
          <td>
            {translateBoolean(this.props.data.researcher_accept)}
          </td>
          <td>
            <div className = "btn-group" role="group">
              <button type = "button" onClick = {this.handleClick} className = "btn btn-info">{this.state.btn}</button>
            </div>
          </td>
        </tr>
      );
    }
  });
