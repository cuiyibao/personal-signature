import React, { Component } from "react"
import { connect } from "react-redux"
import { list, add, del } from "../../store/actions"
import "./home.css"
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canvasHeight: 300,
      canvasWidth: 400,
      events:
        "ontouchstart" in window
          ? ["touchstart", "touchmove", "touchend"]
          : ["mousedown", "mousemove", "mouseup"]
    }
  }

  componentDidMount() {
    this.setState({
      canvasHeight: document.body.clientHeight - 48,
      canvasWidth: document.body.clientWidth
    })

    // 初始化画布
    let cxt = this.canvas.getContext("2d")
    this.setState({ cxt: cxt }, () => {
      this.canvas.addEventListener(
        this.state.events[0],
        this.startEventHandler.bind(this),
        false
      )
      // this.drawLine()
    })
  }

  // 判断浏览器是否支持canvas
  isCanvasSupported() {
    let elem = document.createElement("canvas")
    return !!(elem.getContext && elem.getContext("2d"))
  }

  startEventHandler() {
    this.canvas.addEventListener(
      this.state.events[1],
      this.moveEventHandler.bind(this),
      false
    )
    this.canvas.addEventListener(
      this.state.events[2],
      this.endEventHandler.bind(this),
      false
    )
  }

  moveEventHandler(event) {
    event.preventDefault()
    const evt = event
    const coverPos = this.canvas.getBoundingClientRect()
    const mouseX = evt.clientX - coverPos.left
    const mouseY = evt.clientY - coverPos.top
    this.drawLine(mouseX, mouseY)
  }

  endEventHandler(event) {
    event.preventDefault()
    const { events } = this.state
    this.canvas.removeEventListener(events[1], this.moveEventHandler.bind(this), false)
    this.canvas.removeEventListener(events[2], this.endEventHandler.bind(this), false)
  }

  // 画图
  drawLine(mouseX, mouseY) {
    const cxt = this.state.cxt
    cxt.lineWidth = 5
    cxt.strokeStyle = "#000"
    cxt.lineTo(mouseX, mouseY)
    cxt.lineCap = "round"
    cxt.lineJoin = "round"
    cxt.shadowBlur = 1
    cxt.shadowColor = "#000"
    // 绘制已定义的路径
    cxt.stroke()
  }


  render() {
    const { canvasHeight, canvasWidth } = this.state

    return (
      <div className="home-wrapper">
        {this.isCanvasSupported() ? (
          <canvas
            ref={canvas => (this.canvas = canvas)}
            height={canvasHeight}
            width={canvasWidth}
          />
        ) : (
          <span>对不起，当前浏览器暂不支持此功能！</span>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    list: state.list
  }
}

export default connect(
  mapStateToProps,
  { add, del }
)(Home)
