
/**
 * Main object 
 */
function NicolasMain(delay){
	
	var self = this;
	this._delay = delay;
	this._hexagons = $('.hexagons li');
	this._projectDetailsWrapper = $('#project-details');
	this._panels = '';

	this._init(self);
	
}

NicolasMain.prototype._init = function(self){
	
	
	if(this._hexagons.length && this._projectDetailsWrapper.length)
	{
		this._panels = this._projectDetailsWrapper.find('.panel');
		this.listen(self);
	}

	
};

NicolasMain.prototype.listen = function(self){

	this._hexagons.on('click',function(){
		var hexagon = this;
		console.log(hexagon);
		self.showProjectDetails(self, hexagon);
	});

	this._panels.on('click',function(){
		self.hideProjectDetails(self);
	});
};

NicolasMain.prototype.showProjectDetails = function(self, hexagon){
	
	var currentProject = $(hexagon).find('article').clone();

	this._projectDetailsWrapper.addClass('active');
	this._panels.addClass('active');

	if(currentProject.length)
	{
		window.setTimeout(function(){
			self._projectDetailsWrapper.prepend(currentProject)
			var newArticle = self._projectDetailsWrapper.find('article');
			newArticle.fadeIn(200, function(){
				self._panels.css({"height": newArticle.height() + 200})
			});
		}, this._delay);
	}
};

NicolasMain.prototype.hideProjectDetails = function(self){

	var currentProject = this._projectDetailsWrapper.find('article');

	if(currentProject.length)
	{
		currentProject.remove();

	}
	this._panels.removeClass('active');
	window.setTimeout(function(){
		self._projectDetailsWrapper.removeClass('active');
		self._panels.css({"height": "100%"})
	}, this._delay);
};

