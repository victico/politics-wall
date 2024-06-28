/**
 *  Pages Authentication
 */

'use strict';
const formAuthentication = document.querySelector('#formAuthentication');

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formAuthentication) {
      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'Por favor ingrese nombre de usuario'
              },
              stringLength: {
                min: 6,
                message: 'El nombre de usuario debe tener más de 6 caracteres'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Por favor introduzca su correo electrónico'
              },
              emailAddress: {
                message: 'Por favor ingrese una dirección de correo electrónico válida'
              }
            }
          },
          'email-username': {
            validators: {
              notEmpty: {
                message: 'Por favor ingrese correo electrónico / nombre de usuario'
              },
              stringLength: {
                min: 6,
                message: 'El nombre de usuario debe tener más de 6 caracteres'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Por favor, introduzca su contraseña'
              },
              stringLength: {
                min: 6,
                message: 'La contraseña debe tener más de 6 caracteres'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Por favor confirme la contraseña'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="password"]').value;
                },
                message: 'La contraseña y su confirmación no son lo mismo.'
              },
              stringLength: {
                min: 6,
                message: 'La contraseña debe tener más de 6 caracteres'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Por favor acepta términos y condiciones'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }
  })();
});
