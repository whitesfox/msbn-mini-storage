import "./Progress.css";
interface ProgessProps {
  customStyle?: string;
}
const Progress = ({ customStyle }: ProgessProps) => {
  return (
    <div className={`loadingContainer ${customStyle}`}>
      <span className={`loading`}></span>
    </div>
  );
};
export default Progress;
