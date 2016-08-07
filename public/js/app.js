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

    deleteRequest() {
            $.ajax({
                url: '/api/forms',
                type: 'DELETE',
                dataType: "json",
                data: {type: ['success']},
                success:((elements) => {
                    this.setState({elements});
                })
            })
    }

    render() {
        return <div>
            {this.state.elements}
            <button onClick={this.sumbit.bind(this)}>提交</button>
            <button onClick={this.deleteRequest.bind(this)}>删除</button>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('content'));