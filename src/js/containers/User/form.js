import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import FormRadio from '../../components/FormRadio';
import FormHeader from '../../components/FormHeader';
import { userCreate, resetError } from './actions';
import { LANGUAGES, COUNTRIES } from './constants';
import { objArrayFind, validEmail } from '../../utils';

export class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageOptions: LANGUAGES,
      countryOptions: COUNTRIES
    };

    this._onSearch = this._onSearch.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSearch(allOptions, key, event) {
    const regexp = new RegExp('^' + event.target.value, 'i');
    const nextOptions =
      allOptions.filter(option => regexp.test(option.label || option));
    let obj  = {};
    obj[key] = nextOptions;

    this.setState(obj);
  }

  _onSubmit(data) {
    this.props.dispatch(resetError());
    if (!data.userId) {
      throw new SubmissionError({ 
        userId: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.userId.length < 5) {
      throw new SubmissionError({ 
        userId: 'Must be 5 characters or more',
        _error: 'User ID error.'
      });
    }

    if (!data.password) {
      throw new SubmissionError({ 
        password: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.password.length < 8) {
      throw new SubmissionError({ 
        password: 'Minimum 8 characters',
        _error: 'Required fields empty.'
      });
    };

    if (!data.passwordConfirm) {
      throw new SubmissionError({ 
        passwordConfirm: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (data.passwordConfirm.length < 8) {
      throw new SubmissionError({ 
        passwordConfirm: 'Minimum 8 characters',
        _error: 'Required fields empty.'
      });
    } else if (data.passwordConfirm !== data.password) {
      throw new SubmissionError({ 
        passwordConfirm: 'Password does not match',
        _error: 'Passwords do not match.'
      });
    };

    if (data.securityQuestion1.value === data.securityQuestion2.value) {
      throw new SubmissionError({ 
        securityQuestion2: 'Choose a different question.',
        _error: 'Security questions cannot be the same.'
      });
    }

    const invalidChars = /[&|*"`]+/;
    
    if (!data.securityAnswer1) {
      throw new SubmissionError({ 
        securityAnswer1: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (invalidChars.test(data.securityAnswer1)) {
      throw new SubmissionError({ 
        securityAnswer1: 'Security answer cannot have & | * " `',
        _error: 'Invalid security answer.'
      });
    }

    if (!data.securityAnswer2) {
      throw new SubmissionError({ 
        securityAnswer2: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (invalidChars.test(data.securityAnswer2)) {
      throw new SubmissionError({ 
        securityAnswer2: 'Security answer cannot have & | * " `',
        _error: 'Invalid security answer.'
      });
    }

    if (!data.firstName) {
      throw new SubmissionError({ 
        firstName: 'Required',
        _error: 'Required fields empty.'
      });
    }

    if (!data.lastName) {
      throw new SubmissionError({ 
        lastName: 'Required',
        _error: 'Required fields empty.'
      });
    }

    if (!data.emailAddress) {
      throw new SubmissionError({ 
        emailAddress: 'Required',
        _error: 'Required fields empty.'
      });
    } else if (!validEmail(data.emailAddress)) {
      throw new SubmissionError({ 
        emailAddress: 'Invalid email',
        _error: 'Email address invalid.'
      });
    }

    this.props.dispatch(userCreate(data));
  }

  _renderNewUserFields() {
    return (
      <Box>
        <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Login Information
          </Heading>
        </Box>
        <Field name="userId" component={FormInput} 
          customProps={{
            placeHolder: 'Typically your e-mail address.',
            id: 'userId',
            label: 'User ID'
          }}
        />
        <Field name="password" component={FormInput} 
          customProps={{
            placeHolder: 'Minimum 8 letters, numbers and special characters.',
            id: 'password',
            label: 'Password',
            password: true
          }}
        />
        <Field name="passwordConfirm" component={FormInput} 
          customProps={{
            id: 'passwordConfirm',
            label: 'Confirm Password',
            password: true
          }}
        />
        <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            Forgot Password Information
          </Heading>
        </Box>
        <Field name="securityQuestion1" component={FormSelect} 
          customProps={{
            id: 'securityQuestion1',
            label: 'Security Question 1',
            options: this.props.questions,
            defaultValue: (this.props.questions.length > 0) 
              ? this.props.questions[0]
              : undefined
          }}
        />
        <Field name="securityAnswer1" component={FormInput} 
          customProps={{
            placeHolder: 'Security answer cannot have & | * " `',
            id: 'securityAnswer1',
            label: 'Security Answer 1'
          }}
        />
        <Field name="securityQuestion2" component={FormSelect} 
          customProps={{
            id: 'securityQuestion2',
            label: 'Security Question 2',
            options: this.props.questions,
            defaultValue: (this.props.questions.length > 0) 
              ? this.props.questions[1]
              : undefined
          }}
        />
        <Field name="securityAnswer2" component={FormInput} 
          customProps={{
            placeHolder: 'Security answer cannot have & | * " `',
            id: 'securityAnswer2',
            label: 'Security Answer 2'
          }}
        />
      </Box>);
  }

  _renderFormHeader(userId) {
    const title = (userId)
      ? 'Edit HPE Passport Account'
      : 'Create HPE Passport Account';
    const body = (userId)
      ? undefined
      : <Paragraph>
          If you are an active HPE employee, sign in with your @hpe.com e-mail address.
          if you are outside the HPE organization, you'll need to specify an HPE 
          sponsor after registering.
        </Paragraph>;

    return (
      <FormHeader title={title} body={body} />
    );
  }

  render() {
    const onSubmit = this.props.handleSubmit(this._onSubmit);
    const { userId } = this.props;

    const userIdBlock = (userId)
      ? <Box pad={{ vertical: 'medium' }}>
          <Heading tag="h3" margin="none">
            User ID <strong>{userId}</strong>
          </Heading>
        </Box>
      : undefined;

    const newUserFields = (!userId)
      ? this._renderNewUserFields()
      : undefined;

    const error = (this.props.requestError || this.props.error)
      ? <Box style=
          {{
            color: '#f04953'
          }}
        >
          {this.props.requestError || this.props.error }
        </Box>
      : undefined;

    const formHeader = this._renderFormHeader();

    return (
      <Box pad="medium" flex={false}>
        {formHeader}
        {userIdBlock}
        <Form onSubmit={onSubmit}>
          
          {newUserFields}

          <Box pad={{ vertical: 'medium' }}>
            <Heading tag="h3" margin="none">
              Personal Information
            </Heading>
          </Box>
          <Field name="firstName" component={FormInput} 
            customProps={{
              id: 'firstName',
              label: 'First Name'
            }}
          />
          <Field name="lastName" component={FormInput} 
            customProps={{
              id: 'lastName',
              label: 'Last Name'
            }}
          />
          <Field name="emailAddress" component={FormInput} 
            customProps={{
              id: 'emailAddress',
              label: 'Email Address'
            }}
          />
          <Field name="preferredLanguage" component={FormSelect} 
            customProps={{ 
              id: 'preferredLanguage',
              label: 'Preferred Language',
              onSearch: this._onSearch,
              options: this.state.languageOptions,
              allOptions: LANGUAGES,
              stateKey: 'languageOptions'
            }} 
          />
          <Field name="residentCountryCode" component={FormSelect} 
            customProps={{ 
              id: 'residentCountryCode',
              label: 'Country / Region of residence',
              onSearch: this._onSearch,
              options: this.state.countryOptions,
              allOptions: COUNTRIES,
              stateKey: 'countryOptions'
            }} 
          />

          <Box separator="bottom" pad={{ vertical: 'medium' }}>
            <Heading tag="h3" margin="none">
              Contact Preferences
            </Heading>
          </Box>
          <Box>
            <Paragraph>
              HPE occasionally communicates information that may interest you (product, 
              service, and support information, special offers, or market research 
              invitations). Before you choose, visit our Online Privacy Statement 
              to learn how we use automatic data collection tools and your 
              personal information to tailor your communications.
            </Paragraph>
          </Box>
          <Box direction="row" align="center" pad={{ between: 'medium' }}>
            <Paragraph>
              May HPE contact you by email?
            </Paragraph>
            <Field name="contactByEmail" component={FormRadio} />
          </Box>

          <Footer 
            pad={{ vertical: 'medium', between: 'small' }} 
            direction="column"
            align="start">
            {error}
            <Button primary={true} label="Submit" onClick={onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
};

UserForm = reduxForm({
  form: 'user'
})(UserForm);

UserForm = connect(
  state => ({
    initialValues: {
      contactByEmail: state.user.contactByEmail,
      contactByMail: state.user.contactByMail,
      contactByPhone: state.user.contactByPhone,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      emailAddress: state.user.emailAddress,
      localizationCode: state.user.localizationCode,
      preferredLanguage: state.user.preferredLanguage,
      residentCountryCode: state.user.residentCountryCode,
      securityLevel: state.user.securityLevel,
      preferredLanguage: {
        label: LANGUAGES.find(objArrayFind.bind(this, state.user.preferredLanguage)).label,
        value: state.user.preferredLanguage
      },
      residentCountryCode: {
        label: COUNTRIES.find(objArrayFind.bind(this, state.user.residentCountryCode)).label,
        value: state.user.residentCountryCode
      },
      securityQuestion1: {
        label: state.user.questions[0].label,
        value: state.user.questions[0].value
      },
      securityQuestion2: {
        label: state.user.questions[1].label,
        value: state.user.questions[1].value
      }
    },
    questions: state.user.questions,
    request: state.user.request,
    requestError: state.user.error,
    userId: state.user.userId
  })
)(UserForm);

export default UserForm;
