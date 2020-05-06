console.log(process.env.NODE_ENV); // eslint-disable-line no-console

// Embed runtime in live mode.
if (process.env.WEBPACK_DEV_SERVER) {
  const el = document.createElement('script');
  el.src = `${__webpack_public_path__}scripts/runtime.js`;
  el.async = true;
  document.body.appendChild(el);
}
