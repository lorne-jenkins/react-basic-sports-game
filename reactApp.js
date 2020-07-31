class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shots: 0,
            score: 0
        }
        this.shotSound = new Audio('./assets/audio/woohoo.wav')
        this.scoreSound = new Audio('assets/audio/score.wav')
    }
    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()
        if (Math.random() > 0.5) {
            score += 1
            setTimeout(() => {
                this.scoreSound.play()
            }, 200)
        }
        this.setState((state, props) => ({
            shots: state.shots + 1,
            score
        }))
    }
    render() {
        let shotPercentageDiv

        if (this.state.shots) {
            const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
            shotPercentageDiv = (
                <div>
                    <strong>Shooting %:</strong> {shotPercentage}
                </div>
            )
        }

        return (
            <div className="Team">
                <h2>{this.props.name}</h2>
                <div className='identity'>
                    <img src={this.props.logo} alt={this.props.name} />
                </div>
                <div>
                    <strong>Shots:</strong> {this.state.shots}
                </div>

                <div>
                    <strong>Score:</strong> {this.state.score}
                </div>
                {shotPercentageDiv}
                <button onClick={this.shotHandler}>Shoot!</button>
            </div>

        )
    }
}

function Game(props) {
    return (
        <div className="Game">
            <h1>Welcome to the rumble at {props.venue}</h1>
            <div className="stats">
            <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />

        <div className="versus">
          <h1>VS</h1>
        </div>

        <Team
          name={props.homeTeam.name}
          logo={props.homeTeam.logoSrc}
        />
            </div>
        </div>
    )
}

function App(props) {
    const eagles = {
        name: 'Eagles',
        logoSrc: './assets/images/eagles2.jpg'
    }
    const chihuahuas = {
        name: 'Angry Chihuahuas',
        logoSrc: './assets/images/angry-chihuahua.jpg'
    }
    const bully = {
        name: 'Bull Shite',
        logoSrc: './assets/images/da-bull.jpg'
    }
    const panda = {
        name: 'Canes!',
        logoSrc: './assets/images/pissed-off-panda.jpg'
    }
    const rooster = {
        name: 'Game Cocks',
        logoSrc: './assets/images/madbird.jpg'
    }
    return (
        <div className="App">
            <Game venue="The Garden"
                homeTeam={chihuahuas}
                visitingTeam={eagles} />
            <Game venue="The Dog Pound"
                homeTeam={bully}
                visitingTeam={rooster} />

        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)