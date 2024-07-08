export const getErrText = (error: number) => {
  let errorText = "";
  switch (error) {
    case 400:
      errorText = "Данные отправлены неверно";
      break;

    case 401:
      // localStorage.clear();
      return;

    case 430:
      errorText = "Пользователь не найден";
      break;
    case 431:
      errorText = "Введен не верный код подтверждения";
      break;
    case 432:
      errorText = "Истек срок кода подтверждения";
      break;
    case 433:
      errorText =
        "Превышено количество попыток введения кода, код заблокирован";
      break;
    case 434:
      errorText = "Превышено количество попыток отправки кода подтверждения";
      break;
    case 435:
      errorText = "Возникла ошибка. Попробуйте позже";
      break;
    case 436:
      errorText = "Возникла ошибка. Попробуйте позже";
      break;
    case 437:
      errorText = "Пользователь с указаным номером уже зарегистрирован";
      break;
    case 438:
      errorText = "неверный логин (телефон) или пароль";
      break;
    case 439:
      errorText = "Пользователь не зарегистрирован";
      break;
    case 440:
      errorText = "Восставновление доступно только по номеру телефона";
      break;
    case 441:
      errorText = "VK токен не действителен";
      break;
    case 442:
      errorText = "Восстановите пароль к вашему профилю";
      break;
    case 443:
      errorText = "Пользователь с такой почтой уже зарегистрирован";
      break;
    case 445:
      errorText = "Неверный формат номера телефона";
      break;
    case 461:
      errorText =
        "Извините, в данный момент мы испытываем временные технические проблемы с отправкой SMS-кода. Пожалуйста, попробуйте позже.";
      break;
    case 531:
      errorText = "Нет доступных чеков";
      break;
    default:
      errorText = "Ошибка соединения с сервером";
  }

  return errorText;
};
