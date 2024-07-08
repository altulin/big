/* eslint-disable @typescript-eslint/no-explicit-any */
export function throttle(callee: any, timeout: number) {
  // Таймер будет определять,
  // надо ли нам пропускать текущий вызов.
  let timer: any = null;

  // Как результат возвращаем другую функцию.
  // Это нужно, чтобы мы могли не менять другие части кода,
  // чуть позже мы увидим, как это помогает.
  return function perform(...args: any) {
    // Если таймер есть, то функция уже была вызвана,
    // и значит новый вызов следует пропустить.
    if (timer) return;

    // Если таймера нет, значит мы можем вызвать функцию:
    timer = setTimeout(() => {
      // Аргументы передаём неизменными в функцию-аргумент:
      callee(...args);

      // По окончании очищаем таймер:
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
