class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: []
        }
    }

    componentDidMount() {
        $.get('/api/forms/1', (elements) => {
            this.setState({elements});
        });
    }

    sumbit() {
        $.post('/api/forms', {elements: ['world']},( data ) => {
            this.setState({elements: data});
        }, "json");
    }

    render() {
        return <div>
            {this.state.elements}
            <button onClick={this.sumbit.bind(this)}>提交</button>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('content'));