(function(){var t=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},e={}.hasOwnProperty;this.Gmaps.Google.Builders.Polyline=function(e){function i(t,e){this.args=t,this.provider_options=null!=e?e:{},this.before_init(),this.serviceObject=this.create_polyline(),this.after_init()}return t(i,e),i.prototype.create_polyline=function(){return new(this.primitives().polyline)(this.polyline_options())},i.prototype.polyline_options=function(){var t;return t={path:this._build_path()},_.defaults(t,this.provider_options)},i.prototype._build_path=function(){return _.map(this.args,function(t){return function(e){return new(t.primitives().latLng)(e.lat,e.lng)}}(this))},i}(Gmaps.Objects.BaseBuilder)}).call(this);