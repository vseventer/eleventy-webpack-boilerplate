console.log(process.env.NODE_ENV); // eslint-disable-line no-console

// Embed bundle in live mode.
if (process.env.WEBPACK_DEV_SERVER) {
  const el = document.createElement('script');
  el.src = `${__webpack_public_path__}scripts/bundle.js`;
  el.async = true;
  document.body.appendChild(el);
}
