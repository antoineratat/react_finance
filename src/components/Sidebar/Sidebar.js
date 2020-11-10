import React from 'react'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
import { logout } from '../../auth'
import { PropTypes } from 'prop-types'
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap'
import Button from 'react-bootstrap/Button'

class Sidebar extends React.Component {
	state = {
		collapseOpen: false,
	}
	constructor(props) {
		super(props)
		this.activeRoute.bind(this)
	}
	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
	}
	toggleCollapse = () => {
		this.setState({
			collapseOpen: !this.state.collapseOpen,
		})
	}
	closeCollapse = () => {
		this.setState({
			collapseOpen: false,
		})
	}

	handleClick = (action) => {
		this.closeCollapse()
		if (action) {
			logout()
			localStorage.removeItem('username')
		}
	}

	disconnect() {
		logout()
		localStorage.removeItem('username')
	}

	// creates the links that appear in the left menu / Sidebar
	createLinks = (routes) => {
		return routes.map((prop, key) => {
			if (prop.name !== 'Login' && prop.name !== 'Register') {
				return (
					<NavItem key={key}>
						<NavLink to={prop.layout + prop.path} tag={NavLinkRRD} onClick={() => this.handleClick(prop.action)} activeClassName='active'>
							<i className={prop.icon} />
							{prop.name}
						</NavLink>
					</NavItem>
				)
			} else {
				return null
			}
		})
	}

	// change Color
	changeColor() {
		console.log('coucou change color')
		localStorage.setItem('color', 'linear-gradient(to right, #2b5876 , #4e4376)')
	}

	resetColor() {
		console.log('reset change color')
		localStorage.removeItem('color')
	}
	render() {
		const { routes, logo } = this.props
		let navbarBrandProps
		if (logo && logo.innerLink) {
			navbarBrandProps = {
				to: logo.innerLink,
				tag: Link,
			}
		} else if (logo && logo.outterLink) {
			navbarBrandProps = {
				href: logo.outterLink,
				target: '_blank',
			}
		}
		return (
			<>
				<Navbar className='navbar-vertical fixed-left navbar-light bg-white' expand='md' id='sidenav-main'>
					<Container fluid>
						{/* Toggler */}
						<button className='navbar-toggler' type='button' onClick={this.toggleCollapse}>
							<span className='navbar-toggler-icon' />
						</button>
						{/* Brand */}
						{logo ? (
							<NavbarBrand className='pt-0' {...navbarBrandProps}>
								<img alt={logo.imgAlt} className='navbar-brand-img' src={logo.imgSrc} />
							</NavbarBrand>
						) : null}

						{/* User */}
						<Nav className='align-items-center d-md-none'>
							<UncontrolledDropdown nav>
								<DropdownToggle nav className='nav-link-icon'>
									<i className='ni ni-bell-55' />
								</DropdownToggle>
								<DropdownMenu aria-labelledby='navbar-default_dropdown_1' className='dropdown-menu-arrow' right>
									<DropdownItem>Action</DropdownItem>
									<DropdownItem>Another action</DropdownItem>
									<DropdownItem divider />
									<DropdownItem>Something else here</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown nav>
								<DropdownToggle nav>
									<Media className='align-items-center'>
										<span className='avatar avatar-sm rounded-circle'>
											<img alt='...' src={require('assets/img/theme/default.jpg')} />
										</span>
									</Media>
								</DropdownToggle>
								<DropdownMenu className='dropdown-menu-arrow' right>
									<DropdownItem className='noti-title' header tag='div'>
										<h6 className='text-overflow m-0'>Welcome!</h6>
									</DropdownItem>
									<DropdownItem to='/admin/user-profile' tag={Link}>
										<i className='ni ni-single-02' />
										<span>My profile</span>
									</DropdownItem>
									<DropdownItem to='/admin/user-profile' tag={Link}>
										<i className='ni ni-settings-gear-65' />
										<span>Settings</span>
									</DropdownItem>
									<DropdownItem to='/admin/user-profile' tag={Link}>
										<i className='ni ni-calendar-grid-58' />
										<span>Activity</span>
									</DropdownItem>
									<DropdownItem to='/admin/user-profile' tag={Link}>
										<i className='ni ni-support-16' />
										<span>Support</span>
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem onClick={this.disconnect}>
										<i className='fas fa-sign-out-alt text-grey' />
										<span>Logout</span>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
						{/* Collapse */}
						<Collapse navbar isOpen={this.state.collapseOpen}>
							{/* Collapse header */}
							<div className='navbar-collapse-header d-md-none'>
								<Row>
									{logo ? (
										<Col className='collapse-brand' xs='6'>
											{logo.innerLink ? (
												<Link to={logo.innerLink}>
													<img alt={logo.imgAlt} src={logo.imgSrc} />
												</Link>
											) : (
												<a href={logo.outterLink}>
													<img alt={logo.imgAlt} src={logo.imgSrc} />
												</a>
											)}
										</Col>
									) : null}
									<Col className='collapse-close' xs='6'>
										<button className='navbar-toggler' type='button' onClick={this.toggleCollapse}>
											<span />
											<span />
										</button>
									</Col>
								</Row>
							</div>
							{/* Form */}
							<Form className='mt-4 mb-3 d-md-none'>
								<InputGroup className='input-group-rounded input-group-merge'>
									<Input aria-label='Search' className='form-control-rounded form-control-prepended' placeholder='Search' type='search' />
									<InputGroupAddon addonType='prepend'>
										<InputGroupText>
											<span className='fa fa-search' />
										</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Form>
							{/* Navigation */}
							<Nav navbar>{this.createLinks(routes)}</Nav>
							{/* Divider */}
							<hr className='my-3' />
							{/* // TODO: CHANGE BACKGROUND COLOR SHIT FOCUS FFS */}
							<Button onClick={this.changeColor}>Toggle</Button>
							<Button onClick={this.resetColor}>Reset</Button>
						</Collapse>
					</Container>
				</Navbar>
			</>
		)
	}
}

Sidebar.defaultProps = {
	routes: [{}],
}

Sidebar.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		innerLink: PropTypes.string,
		outterLink: PropTypes.string,
		imgSrc: PropTypes.string.isRequired,
		imgAlt: PropTypes.string.isRequired,
	}),
}

export default Sidebar
