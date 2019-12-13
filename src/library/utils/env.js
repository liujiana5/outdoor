// 运行环境
const Env = {
  // Test via a getter in the options object to see if the passive property is accessed
  supportPassive: (() => {
    let support = false;
    try {
      let opts = Object.defineProperty({}, 'passive', {
        get: function() {
          support = true;
          return support;
        },
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}

    return support;
  })(),

  supportTouch: (() => {
    return 'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch);
  })(),
};

Env.passive = function(passive = false) {
  return Env.supportPassive ? { passive } : false;
};

export default Env;
