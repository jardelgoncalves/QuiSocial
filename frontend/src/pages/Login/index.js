import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { withContext } from '../../AppContext'
import Navbar from '../../components/NavBar'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Col from '../../components/Col'
import Form from '../../components/Form'
import FormGroup from '../../components/FormGroup'
import ilustrationLogin from '../../assets/images/ilustracao_login.svg'

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: ''
  }

  componentDidMount() {
    this.props.logout()
  }


  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleLogin = () => {
    this.props.signUp(this.state)
      .then(result => {
        if (result.response) {
          this.setState({error: result.response.data.error})
          return
        } 
        this.props.history.push('/home')
      })
    
  }

  render () {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col className="col-12 sm-12 lg-6" style={{marginTop: '60px'}}>
              <div className="ilustration">
                <img src={ilustrationLogin} alt="Ilustração" />
              </div>
            </Col>
            <Col className="col-12 sm-12 lg-6" style={{marginTop: '40px'}}>
              <h3>Faça <span className="t-primary">login</span> para continuar</h3>
              { this.state.error.message !== undefined &&
                <div className="alert danger">{this.state.error.message}</div>}
              <Form>
                <FormGroup label='Email'>
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    placeholder="Digite seu email"
                    onChange={this.handleInputChange}
                  />
                  { this.state.error.email !== undefined &&
                    <small className="t-danger">{this.state.error.email[0]}</small> }
                </FormGroup>
                <FormGroup label='Password'>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Digite sua senha"
                    onChange={this.handleInputChange}
                  />
                  { this.state.error.password !== undefined &&
                    <small className="t-danger">{this.state.error.password[0]}</small> }
                </FormGroup>
              </Form>
              <div className="center">
                <button onClick={this.handleLogin} className="btn">Logar</button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withContext(Login)