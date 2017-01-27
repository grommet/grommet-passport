export const createUser = (user, { appId }) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:createUserRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>${appId}</applicationId>\
           </requestContext>\
           <profileCredentials>\
              <newPassword>${user.password}</newPassword>\
              <confirmPassword>${user.passwordConfirm}</confirmPassword>\
           </profileCredentials>\
           <coreProfile>\
              <identity>\
                 <userId>${user.userId}</userId>\
                 <emailAddress>${user.emailAddress}</emailAddress>\
              </identity>\
              <firstName>Alex</firstName>\
              <lastName>Mejias</lastName>\
              <preferredLanguage>${user.preferredLanguage.value}</preferredLanguage>\
              <residentCountryCode>${user.residentCountryCode.value}</residentCountryCode>\
              <contactByEmail>${user.contactByEmail}</contactByEmail>\
              <contactByMail>N</contactByMail>\
              <contactByPhone>N</contactByPhone>\
           </coreProfile>\
           <securityQuestion1>\
              <id>${user.securityQuestion1.value}</id>\
              <question>${user.securityQuestion1.label}</question>\
              <answer>${user.securityAnswer1}</answer>\
           </securityQuestion1>\
           <securityQuestion2>\
              <id>${user.securityQuestion2.value}</id>\
              <question>${user.securityQuestion2.label}</question>\
              <answer>${user.securityAnswer2}</answer>\
           </securityQuestion2>\
        </pas:createUserRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;