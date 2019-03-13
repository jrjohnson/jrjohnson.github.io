import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  async model({ talk_id }) {
    const talk = await this.markdownResolver.file('talks', talk_id);

    return talk.content;
  }
});
