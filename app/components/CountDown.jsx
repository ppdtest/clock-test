var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');


var CountDown = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  componentDidUpdate: function (prevProps,prevState) {
    if(this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count:0}); //break가 없기 때문에 아래까지 진행한다.
        case 'paused':
          clearInterval(this.timer)
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUpdate: function(nextProps,nextState){

  },
  componentWillMount: function(){
    console.log('componentWillMount');
  },
  componentWillUnmount: function() {
    clearInterval(this.timer)
    this.timer = undefined;
    console.log('componentWillUnmount');
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
      if (newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    },1000);
  },
  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },
  handleStatusChange: function(newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  render: function(){
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== 'stopped') { //초기에 멈춤상태 값 넣고 스타트 눌르면 start로 상태가 변함
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange} onCount = {count}/>
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    };

    return (
      <div>
        <Clock totalSeconds={count}></Clock>
        {renderControlArea()}
      </div>
    )

  }
});

module.exports = CountDown;
