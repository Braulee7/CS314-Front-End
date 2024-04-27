import React, { useState } from 'react';

//Pretty sure this is how you make a struct? kinda? Its a thing that holds the UN and PW.
interface UserCredentials
{
  username: string;
  password: string;
}

//The start of commands?
const App: React.FC = () =>
{

  //I assume this makes a new instance of a thing?
  const [credentials, setCredentials] = useState<UserCredentials>
  ({
    username: '',
    password: '',
  });

  //Things that check when you submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>
  {
    //pevents the default, ie you need to put stuff in
    event.preventDefault();

    //if missing one or other, dont proceed and send an alert
    //I dont even know if this works. I think I used HTML to preven the submit from working if it's not filled anyway?
    if (!credentials.username || !credentials.password)
    {
      alert('Please enter both username and password.');
      return;
    }
  };

  //I think this is for inputs changing?
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials(prevState =>({ ...prevState, [name]: value,}));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" min-h-screen bg-gray-300 flex justify-center items-start" >
        <div className= "bg-white p-20 rounded shadow-md w-110">
          <h1 className="text-2xl font-bold mb-4">Login To Your Account</h1>
            <form id ="loginForm">
              <div className= "mb-2">
                <label htmlFor="username" className="block mb-1"> Username:</label>
                <input type = "text" id="username" name="username" value={credentials.username} onChange={handleChange} className="w-full border" required/>
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block mb-1">Password:</label>
                < input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} className="w-full border" required/>
            </div>
            <button type="submit" className="w-full text-lg rounded border hover:bg-blue-300">Login</button>
            </form>
          <p id = "errorMessage" className="error"></p>
        </div>
      </div>
    </form>
  );
};

export default App;
