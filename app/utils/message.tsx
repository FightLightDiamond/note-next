import {message} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

export default {
	info(content?: string, duration?: number, onClose?: void){
		return message.info({
			content,
			duration,
			className: 'toast-custom toast-info',
			onClose
		});
	},
	success(content?: string, duration?: number, onClose?: void){
		return message.success({
			content,
			duration,
			className: 'toast-custom toast-success',
			onClose
		});
	},
	error(content?: string, duration?: number, onClose?: void){
		return message.error({
			content,
			duration,
			className: 'toast-custom toast-error',
			icon: <ExclamationCircleOutlined />,
			onClose,

		});
	},
	warning(content?: string, duration?: number, onClose?: void){
		return message.warning({
			content,
			duration,
			className: 'toast-custom toast-warning',
			onClose
		});
	},
	loading(content?: string, duration?: number, onClose?: void){
		return message.loading({
			content,
			duration,
			className: 'toast-custom toast-loading',
			onClose
		});
	}
}