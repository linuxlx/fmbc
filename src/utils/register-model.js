/* eslint-disable no-param-reassign */
export default function (app, model, cached) {
  // console.log(cached)
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}
