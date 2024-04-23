import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';

const ThemeContext = createContext();
const CurrentUserContext = createContext();


function App() {

  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("");

  return (
    <div className='App'>
      <ThemeContext.Provider value={theme}>
        <CurrentUserContext.Provider value={
          { user, setUser }
        }>




          <WelcomePanel>
            <Panel title={"Welcome"}>
              <LoginForm />
            </Panel>
          </WelcomePanel>
          <Greeting />

        </CurrentUserContext.Provider>
      </ThemeContext.Provider>

      <input
        type='checkbox'
        checked={theme == "dark"}
        onChange={(e) => { setTheme((e.target.checked) ? "dark" : "light") }}

      ></input>{theme} Mode


    </div>
  );
}

function WelcomePanel({ children }) {
  return (

    <div>
      {children}
    </div>
  )
}

function Greeting() {
  const { user } = useContext(CurrentUserContext)
  console.log(user)
  return (
    <div>

      <p>{user.name}</p>
    </div>
  )
}


function Panel({ title, children }) {
  const theme = useContext(ThemeContext)
  const className = "panel-" + theme
  console.log(className)

  return (
    <div>
      <section className={className}>
        <h1>{title} </h1>

        {children}
      </section>

    </div>
  )

}

function LoginForm() {

  const { setUser } = useContext(CurrentUserContext)
  console.log(setUser)
  const theme = useContext(ThemeContext)

  console.log(theme)
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  let canLogin = fname != "" && lname != "";

  return (
    <div>

      <div>
        <label>Firstname : </label>
        <input
          type='text'
          value={fname}
          onChange={(e) => { setFname(e.target.value) }}
        ></input>


      </div>

      <div>
        <label>Lastaname : </label>
        <input
          type='text'
          value={lname}
          onChange={(e) => { setLname(e.target.value) }}
        ></input>
      </div>

      <Button disabled={!canLogin} onclick={() => {
        setUser({
          name: fname + " " + lname
        })
      }}>
        Login
      </Button>

    </div>
  )
}

function Button({ children, disabled, onclick }) {
  const theme = useContext(ThemeContext)
  const className = "panel-" + theme
  return (
    <div>
      <button onClick={onclick} className={className} disabled={disabled}>{children}</button>
    </div>
  )
}


export default App;
