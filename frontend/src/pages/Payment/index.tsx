import { useEffect } from "react";
import { useCreatePaymentMutation } from "../../redux/payment-api";

export function Payment() {
  const [createPayment, { data, isLoading }]  = useCreatePaymentMutation();
  // @ts-ignore
  /* const checkout = new window.YooMoneyCheckoutWidget({
    confirmation_token: 'ct-287e0c37-000f-5000-8000-16961d35b0fd', //Токен, который перед проведением оплаты нужно получить от ЮKassa
    return_url: 'https://proffclean.market/', //Ссылка на страницу завершения оплаты, это может быть любая ваша страница

    //При необходимости можно изменить цвета виджета, подробные настройки см. в документации
     //customization: {
      //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX
      //colors: {
          //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля
          //control_primary: '#00BF96', //Значение цвета в HEX

          //Цвет платежной формы и ее элементов
          //background: '#F2F3F5' //Значение цвета в HEX
      //}
    //},
    error_callback: function(error: any) {
      console.log(error)
    }
  });

  useEffect(() => {
    checkout.render('payment-form');
  }, []); */
  
  useEffect(() => {
    createPayment({
      orderId: 31,
      sum: 20,
    });
  }, [createPayment]);

  console.log(data)

  return (
    <div id='payment-form' />
  );
}