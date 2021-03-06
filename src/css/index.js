'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDraggableCustom = require('@bokuweb/react-draggable-custom');

var _reactDraggableCustom2 = _interopRequireDefault(_reactDraggableCustom);

var _reactResizableBox = require('react-resizable-box');

var _reactResizableBox2 = _interopRequireDefault(_reactResizableBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResizableAndMovable = function (_Component) {
  _inherits(ResizableAndMovable, _Component);

  function ResizableAndMovable(props) {
    _classCallCheck(this, ResizableAndMovable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ResizableAndMovable).call(this, props));

    _this.state = {
      isDraggable: true,
      x: props.x,
      y: props.y,
      original: { x: props.x, y: props.y }
    };
    _this.isResizing = false;
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDrag = _this.onDrag.bind(_this);
    _this.onDragStop = _this.onDragStop.bind(_this);
    _this.onResizeStart = _this.onResizeStart.bind(_this);
    _this.onResize = _this.onResize.bind(_this);
    _this.onResizeStop = _this.onResizeStop.bind(_this);
    return _this;
  }

  _createClass(ResizableAndMovable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props$initAsResizing = this.props.initAsResizing;
      var enable = _props$initAsResizing.enable;
      var direction = _props$initAsResizing.direction;
      var event = _props$initAsResizing.event;

      if (enable) this.refs.resizable.onResizeStart(direction, event);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var x = _ref.x;
      var y = _ref.y;
      var canUpdatePositionByParent = this.props.canUpdatePositionByParent;

      if (canUpdatePositionByParent && x !== this.state.x) this.setState({ x: x });
      if (canUpdatePositionByParent && y !== this.state.y) this.setState({ y: y });
    }
  }, {
    key: 'onResizeStart',
    value: function onResizeStart(dir, styleSize, clientSize, e) {
      this.setState({
        isDraggable: false,
        original: { x: this.state.x, y: this.state.y }
      });
      this.isResizing = true;
      this.props.onResizeStart(dir, styleSize, clientSize, e);
      e.stopPropagation();
    }
  }, {
    key: 'onResize',
    value: function onResize(dir, styleSize, clientSize, delta) {
      if (/left/i.test(dir)) {
        this.setState({ x: this.state.original.x - delta.width });
      }
      if (/top/i.test(dir)) {
        this.setState({ y: this.state.original.y - delta.height });
      }
      this.props.onResize(dir, styleSize, clientSize, delta);
    }
  }, {
    key: 'onResizeStop',
    value: function onResizeStop(dir, styleSize, clientSize, delta) {
      this.setState({ isDraggable: true });
      this.isResizing = false;
      this.props.onResizeStop(dir, styleSize, clientSize, delta);
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(e, ui) {
      if (this.isResizing) return;
      this.props.onDragStart(e, ui);
    }
  }, {
    key: 'onDrag',
    value: function onDrag(e, ui) {
      if (this.isResizing) return;
      var allowX = this.props.moveAxis === 'x';
      var allowY = this.props.moveAxis === 'y';
      var allowBoth = this.props.moveAxis === 'both';
      this.setState({
        x: allowX || allowBoth ? ui.position.left : this.state.x,
        y: allowY || allowBoth ? ui.position.top : this.state.y
      });
      this.props.onDrag(e, ui);
    }
  }, {
    key: 'onDragStop',
    value: function onDragStop(e, ui) {
      if (this.isResizing) return;
      this.props.onDragStop(e, ui);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var style = _props.style;
      var onClick = _props.onClick;
      var onTouchStart = _props.onTouchStart;
      var width = _props.width;
      var height = _props.height;
      var minWidth = _props.minWidth;
      var minHeight = _props.minHeight;
      var maxWidth = _props.maxWidth;
      var maxHeight = _props.maxHeight;
      var zIndex = _props.zIndex;
      var bounds = _props.bounds;
      var moveAxis = _props.moveAxis;
      var dragHandlerClassName = _props.dragHandlerClassName;
      var moveGrid = _props.moveGrid;
      var resizeGrid = _props.resizeGrid;
      var onDoubleClick = _props.onDoubleClick;
      var canUpdateSizeByParent = _props.canUpdateSizeByParent;
      var _state = this.state;
      var x = _state.x;
      var y = _state.y;

      return _react2.default.createElement(
        _reactDraggableCustom2.default,
        {
          axis: moveAxis,
          zIndex: zIndex,
          start: { x: x, y: y },
          disabled: !this.state.isDraggable || this.props.moveAxis === 'none',
          onStart: this.onDragStart,
          handle: dragHandlerClassName,
          onDrag: this.onDrag,
          onStop: this.onDragStop,
          bounds: bounds,
          grid: moveGrid,
          passCoordinate: true,
          x: x,
          y: y
        },
        _react2.default.createElement(
          'div',
          {
            style: {
              width: width,
              height: height,
              cursor: 'move',
              position: 'absolute',
              zIndex: zIndex
            }
          },
          _react2.default.createElement(
            _reactResizableBox2.default,
            {
              ref: 'resizable',
              onClick: onClick,
              onDoubleClick: onDoubleClick,
              onTouchStart: onTouchStart,
              onResizeStart: this.onResizeStart,
              onResize: this.onResize,
              onResizeStop: this.onResizeStop,
              width: canUpdateSizeByParent ? width : '100%',
              height: canUpdateSizeByParent ? height : '100%',
              minWidth: minWidth,
              minHeight: minHeight,
              maxWidth: maxWidth,
              maxHeight: maxHeight,
              customStyle: style,
              customClass: className,
              isResizable: this.props.isResizable,
              handleStyle: this.props.resizerHandleStyle,
              grid: resizeGrid
            },
            this.props.children
          )
        )
      );
    }
  }]);

  return ResizableAndMovable;
}(_react.Component);

ResizableAndMovable.propTypes = {
  initAsResizing: _react.PropTypes.object,
  onResizeStart: _react.PropTypes.func,
  onResize: _react.PropTypes.func,
  onResizeStop: _react.PropTypes.func,
  onDragStart: _react.PropTypes.func,
  onDrag: _react.PropTypes.func,
  onDragStop: _react.PropTypes.func,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  children: _react.PropTypes.any,
  onTouchStart: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  onDoubleClick: _react.PropTypes.func,
  dragHandlerClassName: _react.PropTypes.string,
  resizerHandleStyle: _react.PropTypes.shape({
    top: _react.PropTypes.object,
    right: _react.PropTypes.object,
    bottom: _react.PropTypes.object,
    left: _react.PropTypes.object,
    topRight: _react.PropTypes.object,
    bottomRight: _react.PropTypes.object,
    bottomLeft: _react.PropTypes.object,
    topLeft: _react.PropTypes.object
  }),
  isResizable: _react.PropTypes.shape({
    top: _react.PropTypes.bool,
    right: _react.PropTypes.bool,
    bottom: _react.PropTypes.bool,
    left: _react.PropTypes.bool,
    topRight: _react.PropTypes.bool,
    bottomRight: _react.PropTypes.bool,
    bottomLeft: _react.PropTypes.bool,
    topLeft: _react.PropTypes.bool
  }),
  canUpdateSizeByParent: _react.PropTypes.bool,
  canUpdatePositionByParent: _react.PropTypes.bool,
  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  minWidth: _react.PropTypes.number,
  minHeight: _react.PropTypes.number,
  maxWidth: _react.PropTypes.number,
  maxHeight: _react.PropTypes.number,
  moveAxis: _react.PropTypes.oneOf(['x', 'y', 'both', 'none']),
  moveGrid: _react.PropTypes.arrayOf(_react.PropTypes.number),
  resizeGrid: _react.PropTypes.arrayOf(_react.PropTypes.number),
  bounds: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  x: _react.PropTypes.number,
  y: _react.PropTypes.number,
  zIndex: _react.PropTypes.number
};
ResizableAndMovable.defaultProps = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  zIndex: 100,
  className: '',
  dragHandlerClassName: '',
  initAsResizing: { enable: false, direction: 'bottomRight' },
  isResizable: {
    top: true,
    right: true,
    bottom: true,
    left: true,
    topRight: true,
    bottomRight: true,
    bottomLeft: true,
    topLeft: true
  },
  canUpdatePositionByParent: false,
  canUpdateSizeByParent: false,
  style: {},
  moveAxis: 'both',
  moveGrid: [1, 1],
  onClick: function onClick() {},
  onTouchStart: function onTouchStart() {},
  onDragStart: function onDragStart() {},
  onDrag: function onDrag() {},
  onDragStop: function onDragStop() {},
  onResizeStart: function onResizeStart() {},
  onResize: function onResize() {},
  onResizeStop: function onResizeStop() {},
  resizeGrid: [1, 1]
};
exports.default = ResizableAndMovable;
module.exports = exports['default'];