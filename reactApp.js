function Team(props) {
    let shotPercentageDiv

    if (props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
        shotPercentageDiv = (
            <div>
                <strong>Shooting %:</strong> {shotPercentage}
            </div>
        )
    }

    return (
        <div className="Team">
            <h2>{props.name}</h2>
            <div className='identity'>
                <img src={props.logo} alt={props.name} />
            </div>
            <div>
                <strong>Shots:</strong> {props.stats.shots}
            </div>

            <div>
                <strong>Score:</strong> {props.stats.score}
            </div>
            {shotPercentageDiv}
            <button onClick={props.shotHandler}>Shoot!</button>
        </div>

    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }
        this.shotSound = new Audio('./assets/audio/woohoo.wav')
        this.scoreSound = new Audio('assets/audio/score.wav')
    }
    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1
            setTimeout(() => {
                this.scoreSound.play()
            }, 200)
        }
        this.setState((state, props) => ({
            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
    }
    resetGame = () => {
        this.setState((state, props) => ({
          resetCount: state.resetCount + 1,
          homeTeamStats:  {
            shots: 0,
            score: 0
          },
          visitingTeamStats: {
            shots: 0,
            score: 0
          }
        }))
      }
    render() {
        return (
            <div className="Game">
                <h1>Welcome to the rumble at {this.props.venue}</h1>
                <div className="stats">
                    <Team
                        name={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logoSrc}
                        stats={this.state.visitingTeamStats}
                        shotHandler={() => this.shoot('visiting')}
                    />

                    <div className="versus">
                        <h1>VS</h1>
                        <div>
                            <strong>Resets:</strong> {this.state.resetCount}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
                    </div>

                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}
                    />
                </div>
            </div>
        )
    }
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