const valid = (id, password, cf_password) => {
          if(!id || !password)
          return 'Please add all fields.'
      
          if(password.length < 6)
          return 'Password must be at least 6 characters.'
      
          if(password !== cf_password)
          return 'Confirm password did not match.'
      }
      
      export default valid