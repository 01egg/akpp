
(function() {
  ymaps.ready(init);
  var myMap;
  var placemark = null;

  function init(){
    myMap = new ymaps.Map("map", {
        center: [53.910776, 27.549686],
        zoom: 14
    });

    MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
                '<a class="close" href="#">&times;</a>' +
                '<div class="arrow"></div>' +
                '<div class="popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=285 maxWidth=285 maxHeight=350]]' +
                '</div>' +
                '</div>', {
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.popover', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },
                clear: function () {
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if(!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },
                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                },
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }),

        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                '<div class="popover-content"><img src="/images/place.png"/>$[properties.balloonAddress]</div>' +
                '<div class="popover-content"><img src="/images/phone.png"/><a href="tel:+78432555555">$[properties.balloonNumber]</a></div>'
        ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          balloonHeader: 'АКПП',
          balloonAddress: 'Казань, ул. Восстания, 66',
          balloonNumber: '+7 843 255-55-55'
      }, {
          balloonShadow: false,
          balloonLayout: MyBalloonLayout,
          balloonContentLayout: MyBalloonContentLayout,
          balloonPanelMaxMapArea: 0,
          iconLayout: 'default#image',
          iconImageHref: '/images/place--map.png',
          iconImageSize: [21, 32],
          hideIconOnBalloonOpen: false,
          balloonOffset: [60, -120]
      });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable("scrollZoom");
  }
})();
