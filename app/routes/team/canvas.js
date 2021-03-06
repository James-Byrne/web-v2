import Ember from 'ember';
import preload from 'canvas-web/lib/preload';

export default Ember.Route.extend({
  model({ id }) {
    return this.get('store').findRecord('canvas', id,
      { adapterOptions: { team: this.modelFor('team') } });
  },

  afterModel() {
    const team = this.modelFor('team');
    if (team.get('hasChannelsRead') && team.get('isInTeam')) {
      return preload(this.modelFor('team'), ['channels']);
    }

    return null;
  },

  titleToken(canvas) {
    return canvas.get('title');
  }
});
