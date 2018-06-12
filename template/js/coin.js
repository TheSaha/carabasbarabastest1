function newInf(){
var el, s;
el=document.getElementById("newEl");
s=el.innerHTML;
s=s+'<input type="checkbox" onclick="clik(this);">';
el.innerHTML=s;
 
 };
 
function clik(el){
el.parentNode.removeChild(el);
 };
 

 
 
 
 
 render: function() { 
    var stuff = this.props.stuff;

    function getHtmlForKey(key_name, title) {
        var key_name = key_name.toLowerCase();
            return Object.keys(thing).filter(function(key) {
                return key && key.toLowerCase().indexOf(key_name) === 0;
            }).map(function(key, index) {
                var group_title = index === 0 ? title : '';
                if(profile[key] != null && thing[key] != "") {
                    return (
                        <span>
                        {group_title ? (
                            <li className="example-group-class">{group_title}</li>
                        ) : null }
                        <li key={key} className="example-class">
                            {thing[key]}
                        </li>
                        </span>
                    );
                }    
            }, this);
    }

    /** Grouping by keyword **/
    var group1 = getHtmlForKey('stuff1', 'Group Title 1');

    /** Return Facecards **/
    if (stuff) {
        return (
            <div className="col-md-6">
                <div className="media">
                    <div className="pull-left">
                        <a href="#" onClick={this.open}>
                            <img src={this.props.stuff} className="media" />
                        </a>
                    </div>
                    <div className="top">
                        {group1}
                    </div>
       }
}