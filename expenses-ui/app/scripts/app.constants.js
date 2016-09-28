angular.module('expenses')
  .constant('CONSTANTS', {
    SUCCESS: 'success',
    FAILURE: 'failure',
    MAIL_DOMAIN: '@expenses.com',
    CALENDAR_TYPE_BY_HR: 1,
    CALENDAR_TYPE_BY_DAY: 2,
    ROLES:{
      VISITOR: 1,
      ADMIN: 2,
      CLIENT: 3,
      EMPLOYEE: 4
    },
    PERSON_TYPE:{
      CLIENT: 1,
      EMPLOYEE: 2,
      SUPPLIER: 3
    },
    EMPLOYEE_TYPE:{
      DOCTOR: 1,
      ASISTENTE_MEDICO: 2,
      ADMINISTRACION: 3,
      INTENDENCIA: 4
    },
    PRODUCT_TYPE:{
      PRODUCT: 1,
      SERVICE: 2
    },
    FILE_PATH: {
      cubicle: 'cubicle',
      banner: 'banner',
      product: 'product',
      equipment: 'equipment',
      person: 'person'
    }
  });