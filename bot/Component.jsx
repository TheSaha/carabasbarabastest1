var React = require('react');


module.exports = React.createClass({
	_handleClick: function() {
		alert();
	},
	render: function() {
		return(
	<DOCTYPE html>
		<div>
		 <h1>Sosi Pisos</h1>
		 <p>Isn't server side rendering remarkable?</p>
		 <button onclick={this._handleClick}>Click Me</button>
		 </div>
		 );
	}
});