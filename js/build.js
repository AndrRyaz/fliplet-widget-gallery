Fliplet.Widget.instance('image-gallery', function(data) {

  const photoswipeTemplate = Fliplet.Widget.Templates['templates.photoswipe'];

  function initGallery() {
    const WALL_SELECTOR = '[data-image-gallery-id=' + data.id + '] .wall:not("[data-mce-bogus] [data-image-gallery-id=' + data.id + '] .wall")';

    var wall = new Freewall(WALL_SELECTOR);

    wall.reset({
      selector: '.brick',
      animate: true,
      cellW: function() {
        var width = $('body').width();
        return width >= 640 ? 200 : 135;
      },
      cellH: 'auto',
      gutterX: 10,
      gutterY: 10,
      onResize: function() {
        wall.fitWidth();
        wall.refresh();
      }
    });

    if (!Fliplet.Env.get('interact')) {
      $(WALL_SELECTOR + ' .brick img').click(function() {
        var $clickedBrick = $(this)[0].parentElement;
        data.options = data.options || {}
        data.options.index = $clickedBrick.index - 1

        Fliplet.Navigate.previewImages(data);
      });
    }

    wall.fitWidth();


    $(WALL_SELECTOR + ' .brick img').on('load', function() {
      $(WALL_SELECTOR).trigger('resize');
    });

    return wall;
  }

  // Appearance change Hook
  Fliplet.Hooks.on('appearanceChanged', function () {
    initGallery();
  });

  initGallery();
});
