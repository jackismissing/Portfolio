
/**
 * Main object 
 */
function NicolasMain(delay){
	
	var self = this;
	this._delay = delay;
	this._mainWrapper = $('.wrapper'); 
	this._hexagons = $('.hexagons li');
	this._projectDetailsWrapper = $('#project-details');
	this._closeBar = $('#close-bar');
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
		self.showProjectDetails(self, hexagon);
	});

	if(this._closeBar.length)
	{
		this._closeBar.on('click',function(){
			self.hideProjectDetails(self);
		});
	}
	
};

NicolasMain.prototype.showProjectDetails = function(self, hexagon){
	
	var currentProject = $(hexagon).find('article').clone();

	this._projectDetailsWrapper.addClass('active');
	this._panels.addClass('active');

	if(currentProject.length && this._mainWrapper.length)
	{
		window.setTimeout(function(){

			self._mainWrapper.addClass('no-display');
			self._projectDetailsWrapper.prepend(currentProject)
			var newArticle = self._projectDetailsWrapper.find('article');
			var newArticleHeight = newArticle.outerHeight( true );

			newArticle.fadeIn(200, function(){

				if(newArticleHeight >= $(window).height())
				{
					self._panels.css({"height": newArticleHeight + 200})
					
				}	
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

	if(this._mainWrapper.length && this._mainWrapper.hasClass('no-display'))
	{
		this._mainWrapper.removeClass('no-display');
	}
	this._panels.removeClass('active');
	window.setTimeout(function(){
		self._projectDetailsWrapper.removeClass('active');
		self._panels.css({"height": "100%"})
	}, this._delay);
};

