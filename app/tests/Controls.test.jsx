var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Controls', ()=> {
  it('should exist',()=>{
    expect(Controls).toExist();
  });


  describe('render', ()=> {
    it('should render pause when started',()=>{
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started"/>);
      var $el = $(ReactDOM.findDOMNode(controls));
      var $pauseButton = $el.find('button:contains(Pause)') //버튼 태그 찾는데 Pasue를 가지고있는
      expect($pauseButton.length).toBe(1);  //jquery select의 length는 찾은 아이템의 개수를 말함

    });

    it('should render start when paused',()=>{
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused"/>);
      var $el = $(ReactDOM.findDOMNode(controls));
      var $startButton = $el.find('button:contains(Start)') //버튼 태그 찾는데 Pasue를 가지고있는
      expect($startButton.length).toBe(1);  //jquery select의 length는 찾은 아이템의 개수를 말함

    });
  });

})
