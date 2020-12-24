// import { PDFExport } from '@progress/kendo-react-pdf';
import ReactDom from 'react-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ExportToPDFButton = ({ filename, domRef, children, ...rest }) => {
  const onClick = () => {
    const input = domRef.current;
    
    html2canvas(ReactDom.findDOMNode(input))
      .then((canvas) => {
        console.log(canvas);
        const imageData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF();
        pdf.addImage(imageData, 'PNG', 0, 0);
        pdf.save(`${filename}.pdf`);
      });
  }

  return (
    <div {...rest} onClick={onClick}>
      {children}
    </div>
  );
};

export default ExportToPDFButton;

// <PDFExport
//   paperSize='Letter'
//   fileName={`${filename}.pdf`}
//   title={filename}
//   subject='quiz'
//   ref={(r) => this.resume = r}
// >
// {document.querySelector(`#${elementTagId}`)}
// </PDFExport>