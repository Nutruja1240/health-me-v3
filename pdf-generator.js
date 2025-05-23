document.addEventListener('DOMContentLoaded', function() {
    const savePdfBtn = document.getElementById('savePdf');
    
    savePdfBtn.addEventListener('click', function() {
        // ใช้ html2canvas จับภาพหน้าเว็บ
        html2canvas(document.getElementById('results')).then(canvas => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // ตั้งค่าฟอนต์ภาษาไทย
            doc.addFont('https://fonts.googleapis.com/css2?family=Prompt&display=swap', 'Prompt', 'normal');
            doc.setFont('Prompt');
            
            // เพิ่มภาพจาก canvas
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            
            // ตรวจสอบความสูงของภาพ
            let heightLeft = imgHeight;
            let position = 0;
            
            // เพิ่มหน้าแรก
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // เพิ่มหน้าต่อไปหากจำเป็น
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // บันทึกไฟล์ PDF
            doc.save('HealthMe_ผลการประเมินสุขภาพ.pdf');
        });
    });
});