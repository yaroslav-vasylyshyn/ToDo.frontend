import "./Modal.css"
import { CloseOutlined } from '@ant-design/icons';

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <CloseOutlined className="close-btn" onClick={onClose}/>
        {children}
      </div>
    </div>
  )
}
