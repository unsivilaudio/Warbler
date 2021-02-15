import React from 'react';

class AuthForm extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        profileImageUrl: '',
    };

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? 'signup' : 'signin';
        this.props
            .onAuth(authType, this.state)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(() => {
                return;
            });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { email, username, password, profileImageUrl } = this.state;
        const {
            errors,
            heading,
            buttonText,
            history,
            removeError,
        } = this.props;

        history.listen(() => removeError());

        return (
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (
                                <div className='alert alert-danger'>
                                    {errors.message}
                                </div>
                            )}
                            <div className='form-group'>
                                <label htmlFor='email'>Email address:</label>
                                <input
                                    className='form-control'
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    required
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password:</label>
                                <input
                                    className='form-control'
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    required
                                    onChange={this.handleChange}
                                />
                            </div>
                            {this.props.signUp && (
                                <div>
                                    <div className='form-group'>
                                        <label htmlFor='username'>
                                            Username:
                                        </label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            id='username'
                                            name='username'
                                            value={username}
                                            required
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='image-url'>
                                            Image Url:
                                        </label>
                                        <input
                                            className='form-control'
                                            type='text'
                                            id='image-url'
                                            name='profileImageUrl'
                                            value={profileImageUrl}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            )}
                            <button className='btn btn-primary'>
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;
