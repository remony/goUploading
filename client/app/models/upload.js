import Model from 'ember-data/model';

export default Model.extend({
  thumbnalImage: DS.attrs('file'),
  imageUrl: Ember.computed.alias('thumbnailImage.thumbnail_image.url')
});
