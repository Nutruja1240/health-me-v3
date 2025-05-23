document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('healthForm');
    const resultsContainer = document.getElementById('results');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // รับค่าจากฟอร์ม
        const age = parseInt(document.getElementById('age').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const waist = parseFloat(document.getElementById('waist').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const systolic = parseInt(document.getElementById('systolic').value);
        const diastolic = parseInt(document.getElementById('diastolic').value);
        const gripStrength = parseFloat(document.getElementById('gripStrength').value);
        const sitAndReach = parseInt(document.getElementById('sitAndReach').value);
        const sitUps = parseInt(document.getElementById('sitUps').value);
        const chairStand = parseInt(document.getElementById('chairStand').value);
        const stepTest = parseInt(document.getElementById('stepTest').value);
        
        // คำนวณผลลัพธ์
        const results = calculateResults(age, gender, waist, weight, height, systolic, diastolic, gripStrength, sitAndReach, sitUps, chairStand, stepTest);
        
        // แสดงผลลัพธ์
        displayResults(results);
        
        // แสดงส่วนผลลัพธ์
        resultsContainer.style.display = 'block';
        
        // เลื่อนไปยังผลลัพธ์
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    });
    
    // ฟังก์ชันคำนวณผลลัพธ์
    function calculateResults(age, gender, waist, weight, height, systolic, diastolic, gripStrength, sitAndReach, sitUps, chairStand, stepTest) {
        // คำนวณ BMI
        const heightInMeter = height / 100;
        const bmi = weight / (heightInMeter * heightInMeter);
        
        // ประเมิน BMI
        let bmiCategory, bmiColor, bmiEmoji;
        if (bmi < 18.5) {
            bmiCategory = 'น้ำหนักน้อย / ผอม';
            bmiColor = 'badge-warning';
            bmiEmoji = '⚠️';
        } else if (bmi < 23) {
            bmiCategory = 'ปกติ (สุขภาพดี)';
            bmiColor = 'badge-success';
            bmiEmoji = '👍';
        } else if (bmi < 25) {
            bmiCategory = 'ท้วม / โรคอ้วนระดับ 1';
            bmiColor = 'badge-warning';
            bmiEmoji = '⚠️';
        } else if (bmi < 30) {
            bmiCategory = 'อ้วน / โรคอ้วนระดับ 2';
            bmiColor = 'badge-danger';
            bmiEmoji = '❌';
        } else {
            bmiCategory = 'อ้วนมาก / โรคอ้วนระดับ 3';
            bmiColor = 'badge-danger';
            bmiEmoji = '❌';
        }
        
        // คำแนะนำ BMI
        let bmiRecommendation = '';
        if (bmi < 18.5) {
            bmiRecommendation = `
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>รับประทานอาหารให้ครบ 5 หมู่ เพิ่มปริมาณอาหารที่มีพลังงานสูง</li>
                    <li>รับประทานอาหารบ่อยขึ้น 5-6 มื้อต่อวัน</li>
                    <li>ออกกำลังกายแบบฝึกความแข็งแรงของกล้ามเนื้อ</li>
                    <li>ปรึกษาแพทย์หรือนักโภชนาการหากน้ำหนักไม่เพิ่ม</li>
                </ul>
            `;
        } else if (bmi < 23) {
            bmiRecommendation = `
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>รักษาน้ำหนักให้อยู่ในเกณฑ์ปกติ</li>
                    <li>รับประทานอาหารครบ 5 หมู่ ในปริมาณที่เหมาะสม</li>
                    <li>ออกกำลังกายสม่ำเสมอ อย่างน้อย 150 นาทีต่อสัปดาห์</li>
                    <li>ตรวจสุขภาพประจำปี</li>
                </ul>
            `;
        } else {
            bmiRecommendation = `
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>ควบคุมปริมาณอาหาร ลดอาหารหวาน มัน เค็ม</li>
                    <li>เพิ่มการรับประทานผักและผลไม้</li>
                    <li>ออกกำลังกายอย่างน้อย 150-300 นาทีต่อสัปดาห์</li>
                    <li>ปรึกษาแพทย์หรือนักโภชนาการเพื่อวางแผนลดน้ำหนัก</li>
                    <li>ตรวจสุขภาพเป็นประจำ</li>
                </ul>
            `;
        }
        
        // ประเมินรอบเอว
        let waistCategory, waistColor, waistEmoji;
        const waistThreshold = gender === 'male' ? 90 : 80;
        
        if (waist < waistThreshold) {
            waistCategory = 'ปกติ';
            waistColor = 'badge-success';
            waistEmoji = '👍';
        } else {
            waistCategory = 'เกินมาตรฐาน';
            waistColor = 'badge-danger';
            waistEmoji = '❌';
        }
        
        // คำแนะนำรอบเอว
        let waistRecommendation = '';
        if (waist >= waistThreshold) {
            waistRecommendation = `
                <p><strong>ผลกระทบที่อาจเกิดขึ้น:</strong> เสี่ยงต่อโรคเบาหวาน ความดันโลหิตสูง ไขมันในเลือดสูง และโรคหัวใจ</p>
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>ลดอาหารประเภทแป้งขัดขาวและน้ำตาล</li>
                    <li>ลดอาหารไขมันสูง โดยเฉพาะไขมันอิ่มตัวและไขมันทรานส์</li>
                    <li>เพิ่มการรับประทานผักและผลไม้</li>
                    <li>ออกกำลังกายแบบแอโรบิกอย่างน้อย 150 นาทีต่อสัปดาห์</li>
                    <li>ฝึกความแข็งแรงของกล้ามเนื้อ 2-3 ครั้งต่อสัปดาห์</li>
                    <li>ควบคุมปริมาณอาหารในแต่ละมื้อ</li>
                </ul>
            `;
        } else {
            waistRecommendation = `
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>รักษารอบเอวให้อยู่ในเกณฑ์ปกติ</li>
                    <li>ควบคุมปริมาณอาหารในแต่ละมื้อ</li>
                    <li>ออกกำลังกายสม่ำเสมอ</li>
                    <li>ตรวจสุขภาพประจำปี</li>
                </ul>
            `;
        }
        
        // ประเมินความดันโลหิต
        let bpCategory, bpColor, bpEmoji;
        if (systolic < 120 && diastolic < 80) {
            bpCategory = 'ความดันโลหิตปกติ';
            bpColor = 'badge-success';
            bpEmoji = '👍';
        } else if (systolic < 130 && diastolic < 85) {
            bpCategory = 'ความดันโลหิตปกติค่อนข้างสูง';
            bpColor = 'badge-warning';
            bpEmoji = '⚠️';
        } else if (systolic < 140 && diastolic < 90) {
            bpCategory = 'ความดันโลหิตสูงเล็กน้อย';
            bpColor = 'badge-warning';
            bpEmoji = '⚠️';
        } else if (systolic < 160 && diastolic < 100) {
            bpCategory = 'ความดันโลหิตสูงระยะเริ่มแรก';
            bpColor = 'badge-danger';
            bpEmoji = '❌';
        } else if (systolic < 180 && diastolic < 110) {
            bpCategory = 'ความดันโลหิตสูงระยะปานกลาง';
            bpColor = 'badge-danger';
            bpEmoji = '❌';
        } else {
            bpCategory = 'ความดันโลหิตสูงระยะรุนแรง';
            bpColor = 'badge-danger';
            bpEmoji = '❌';
        }
        
        // คำแนะนำความดันโลหิต
        let bpRecommendation = '';
        if (systolic < 120 && diastolic < 80) {
            bpRecommendation = `
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>รักษาสุขภาพให้แข็งแรง</li>
                    <li>ควบคุมอาหารและออกกำลังกายสม่ำเสมอ</li>
                    <li>ตรวจความดันโลหิตเป็นประจำ</li>
                </ul>
            `;
        } else if (systolic < 140 && diastolic < 90) {
            bpRecommendation = `
                <p><strong>ผลกระทบที่อาจเกิดขึ้น:</strong> เสี่ยงต่อการเป็นโรคความดันโลหิตสูง</p>
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>ลดอาหารเค็มและอาหารที่มีโซเดียมสูง</li>
                    <li>ออกกำลังกายอย่างสม่ำเสมอ</li>
                    <li>ควบคุมน้ำหนักให้อยู่ในเกณฑ์ปกติ</li>
                    <li>ตรวจความดันโลหิตเป็นประจำ</li>
                    <li>ปรึกษาแพทย์หากความดันโลหิตยังสูงอยู่</li>
                </ul>
            `;
        } else {
            bpRecommendation = `
                <p><strong>ผลกระทบที่อาจเกิดขึ้น:</strong> เสี่ยงต่อโรคหัวใจ โรคหลอดเลือดสมอง โรคไต และภาวะแทรกซ้อนอื่นๆ</p>
                <p><strong>คำแนะนำ:</strong></p>
                <ul>
                    <li>ลดอาหารเค็มและอาหารที่มีโซเดียมสูง</li>
                    <li>ออกกำลังกายอย่างสม่ำเสมอ</li>
                    <li>ควบคุมน้ำหนักให้อยู่ในเกณฑ์ปกติ</li>
                    <li>งดสูบบุหรี่และเครื่องดื่มแอลกอฮอล์</li>
                    <li>พบแพทย์เพื่อรับการรักษาที่เหมาะสม</li>
                    <li>รับประทานยาตามแพทย์สั่งอย่างเคร่งครัด</li>
                </ul>
            `;
        }
        
        // ประเมินสมรรถภาพร่างกาย
        const fitnessResults = evaluateFitnessTests(age, gender, gripStrength, weight, sitAndReach, sitUps, chairStand, stepTest);
        
        return {
            bmi: bmi.toFixed(1),
            bmiCategory,
            bmiColor,
            bmiEmoji,
            bmiRecommendation,
            waistCategory,
            waistColor,
            waistEmoji,
            waistRecommendation,
            bpCategory,
            bpColor,
            bpEmoji,
            bpRecommendation,
            fitnessResults
        };
    }
    
    // ฟังก์ชันประเมินสมรรถภาพร่างกาย
    function evaluateFitnessTests(age, gender, gripStrength, weight, sitAndReach, sitUps, chairStand, stepTest) {
        // คำนวณแรงบีบมือต่อน้ำหนักตัว
        const gripStrengthRatio = gripStrength / weight;
        
        // กำหนดเกณฑ์ตามอายุและเพศ
        const ageGroup = getAgeGroup(age);
        const isMale = gender === 'male';
        
        // ประเมินแรงบีบมือ
        const gripResult = evaluateGripStrength(ageGroup, isMale, gripStrengthRatio);
        
        // ประเมินการนั่งงอตัว
        const sitAndReachResult = evaluateSitAndReach(ageGroup, isMale, sitAndReach);
        
        // ประเมินซิตอัพ
        const sitUpsResult = evaluateSitUps(ageGroup, isMale, sitUps);
        
        // ประเมินการลุก-นั่งบนเก้าอี้
        const chairStandResult = evaluateChairStand(ageGroup, isMale, chairStand);
        
        // ประเมินการยกเข่าขึ้น-ลง
        const stepTestResult = evaluateStepTest(ageGroup, isMale, stepTest);
        
        return {
            gripResult,
            sitAndReachResult,
            sitUpsResult,
            chairStandResult,
            stepTestResult
        };
    }
    
    // ฟังก์ชันกำหนดกลุ่มอายุ
    function getAgeGroup(age) {
        if (age >= 16 && age <= 19) return '16-19';
        if (age >= 20 && age <= 29) return '20-29';
        if (age >= 30 && age <= 39) return '30-39';
        if (age >= 40 && age <= 49) return '40-49';
        if (age >= 50 && age <= 59) return '50-59';
        return '16-19'; // ค่าเริ่มต้น
    }
    
    // ฟังก์ชันประเมินแรงบีบมือ
    function evaluateGripStrength(ageGroup, isMale, ratio) {
        // เกณฑ์แรงบีบมือต่อน้ำหนักตัว (ชาย/หญิง)
        const gripStandards = {
            '16-19': { male: [0.50, 0.51, 0.61, 0.70, 0.80], female: [0.40, 0.41, 0.49, 0.56, 0.64] },
            '20-29': { male: [0.51, 0.52, 0.62, 0.71, 0.81], female: [0.40, 0.41, 0.50, 0.59, 0.68] },
            '30-39': { male: [0.52, 0.53, 0.62, 0.71, 0.80], female: [0.42, 0.43, 0.53, 0.63, 0.69] },
            '40-49': { male: [0.41, 0.42, 0.52, 0.63, 0.73], female: [0.36, 0.37, 0.45, 0.54, 0.62] },
            '50-59': { male: [0.35, 0.36, 0.48, 0.59, 0.69], female: [0.32, 0.33, 0.40, 0.47, 0.54] }
        };
        
        const standards = gripStandards[ageGroup];
        const thresholds = isMale ? standards.male : standards.female;
        
        let level, color, emoji, recommendation;
        
        if (ratio < thresholds[0]) {
            level = 'ต่ำมาก';
            color = 'badge-danger';
            emoji = '❌';
            recommendation = 'ควรฝึกความแข็งแรงของกล้ามเนื้อมือและแขน ด้วยการบีบลูกบอลหรืออุปกรณ์ฝึกแรงบีบมือ';
        } else if (ratio < thresholds[1]) {
            level = 'ต่ำ';
            color = 'badge-warning';
            emoji = '⚠️';
            recommendation = 'ควรฝึกความแข็งแรงของกล้ามเนื้อมือและแขน ด้วยการบีบลูกบอลหรืออุปกรณ์ฝึกแรงบีบมือ';
        } else if (ratio < thresholds[2]) {
            level = 'ปานกลาง';
            color = 'badge-info';
            emoji = '👍';
            recommendation = 'ฝึกความแข็งแรงของกล้ามเนื้อมือและแขนเป็นประจำเพื่อพัฒนาต่อไป';
        } else if (ratio < thresholds[3]) {
            level = 'ดี';
            color = 'badge-success';
            emoji = '👍👍';
            recommendation = 'ความแข็งแรงของกล้ามเนื้อมือและแขนอยู่ในระดับดี ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        } else {
            level = 'ดีมาก';
            color = 'badge-success';
            emoji = '👍👍👍';
            recommendation = 'ความแข็งแรงของกล้ามเนื้อมือและแขนอยู่ในระดับดีมาก ควรรักษาระดับนี้ไว้';
        }
        
        return {
            testName: 'แรงบีบมือ (กิโลกรัม/น้ำหนักตัว)',
            value: ratio.toFixed(3),
            level,
            color,
            emoji,
            recommendation
        };
    }
    
    // ฟังก์ชันประเมินการนั่งงอตัว
    function evaluateSitAndReach(ageGroup, isMale, value) {
        // เกณฑ์การนั่งงอตัว (ชาย/หญิง)
        const sitAndReachStandards = {
            '16-19': { male: [31, 32, 39, 46, 54], female: [24, 25, 33, 41, 49] },
            '20-29': { male: [30, 31, 39, 47, 53], female: [23, 24, 31, 39, 46] },
            '30-39': { male: [25, 26, 34, 43, 52], female: [22, 23, 30, 38, 45] },
            '40-49': { male: [24, 25, 34, 42, 50], female: [21, 22, 29, 36, 43] },
            '50-59': { male: [19, 20, 28, 36, 43], female: [12, 13, 19, 25, 31] }
        };
        
        const standards = sitAndReachStandards[ageGroup];
        const thresholds = isMale ? standards.male : standards.female;
        
        let level, color, emoji, recommendation;
        
        if (value < thresholds[0]) {
            level = 'ต่ำมาก';
            color = 'badge-danger';
            emoji = '❌';
            recommendation = 'ควรฝึกยืดเหยียดกล้ามเนื้อหลังและขาเป็นประจำ เพื่อเพิ่มความยืดหยุ่น';
        } else if (value < thresholds[1]) {
            level = 'ต่ำ';
            color = 'badge-warning';
            emoji = '⚠️';
            recommendation = 'ควรฝึกยืดเหยียดกล้ามเนื้อหลังและขาเป็นประจำ เพื่อเพิ่มความยืดหยุ่น';
        } else if (value < thresholds[2]) {
            level = 'ปานกลาง';
            color = 'badge-info';
            emoji = '👍';
            recommendation = 'ฝึกยืดเหยียดกล้ามเนื้อเป็นประจำเพื่อพัฒนาความยืดหยุ่นต่อไป';
        } else if (value < thresholds[3]) {
            level = 'ดี';
            color = 'badge-success';
            emoji = '👍👍';
            recommendation = 'ความยืดหยุ่นอยู่ในระดับดี ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        } else {
            level = 'ดีมาก';
            color = 'badge-success';
            emoji = '👍👍👍';
            recommendation = 'ความยืดหยุ่นอยู่ในระดับดีมาก ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        }
        
        return {
            testName: 'การนั่งงอตัวไปข้างหน้า (เซนติเมตร)',
            value: value,
            level,
            color,
            emoji,
            recommendation
        };
    }
    
    // ฟังก์ชันประเมินซิตอัพ
    function evaluateSitUps(ageGroup, isMale, value) {
        // เกณฑ์ซิตอัพ 30 วินาที (ชาย)
        const maleStandards = {
            '16-19': { excellent: 22, good: [19, 21], medium: [14, 18], low: [11, 13], veryLow: 10 },
            '20-29': { excellent: 20, good: [17, 19], medium: [11, 16], low: [7, 10], veryLow: 6 },
            '30-39': { excellent: 17, good: [14, 16], medium: [8, 13], low: [5, 7], veryLow: 4 },
            '40-49': { excellent: 16, good: [12, 15], medium: [6, 11], low: [4, 5], veryLow: 3 },
            '50-59': { excellent: 13, good: [10, 12], medium: [5, 9], low: [2, 4], veryLow: 1 }
        };

        // เกณฑ์ซิตอัพ 30 วินาที (หญิง)
        const femaleStandards = {
            '16-19': { excellent: 22, good: [19, 21], medium: [14, 18], low: [11, 13], veryLow: 10 },
            '20-29': { excellent: 20, good: [17, 19], medium: [11, 16], low: [7, 10], veryLow: 6 },
            '30-39': { excellent: 17, good: [14, 16], medium: [8, 13], low: [5, 7], veryLow: 4 },
            '40-49': { excellent: 16, good: [12, 15], medium: [6, 11], low: [4, 5], veryLow: 3 },
            '50-59': { excellent: 13, good: [10, 12], medium: [5, 9], low: [2, 4], veryLow: 1 }
        };

        const criteria = isMale ? maleStandards[ageGroup] : femaleStandards[ageGroup];
        
        let level, color, emoji, recommendation;
        
        if (value <= criteria.veryLow) {
            level = 'ต่ำมาก';
            color = 'badge-danger';
            emoji = '❌';
            recommendation = 'ควรฝึกความแข็งแรงของกล้ามเนื้อท้องด้วยการออกกำลังกายเช่น ซิตอัพ แพลงค์ เป็นประจำ';
        } else if (value <= criteria.low[1]) {
            level = 'ต่ำ';
            color = 'badge-warning';
            emoji = '⚠️';
            recommendation = 'ควรฝึกความแข็งแรงของกล้ามเนื้อท้องด้วยการออกกำลังกายเช่น ซิตอัพ แพลงค์ เป็นประจำ';
        } else if (value <= criteria.medium[1]) {
            level = 'ปานกลาง';
            color = 'badge-info';
            emoji = '👍';
            recommendation = 'ฝึกความแข็งแรงของกล้ามเนื้อท้องเป็นประจำเพื่อพัฒนาต่อไป';
        } else if (value <= criteria.good[1]) {
            level = 'ดี';
            color = 'badge-success';
            emoji = '👍👍';
            recommendation = 'ความแข็งแรงของกล้ามเนื้อท้องอยู่ในระดับดี ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        } else {
            level = 'ดีมาก';
            color = 'badge-success';
            emoji = '👍👍👍';
            recommendation = 'ความแข็งแรงของกล้ามเนื้อท้องอยู่ในระดับดีมาก ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        }
        
        return {
            testName: 'การซิตอัพ 30 วินาที (ครั้ง)',
            value: value,
            level,
            color,
            emoji,
            recommendation
        };
    }
    
    // ฟังก์ชันประเมินการลุก-นั่งบนเก้าอี้
    function evaluateChairStand(ageGroup, isMale, value) {
        // เกณฑ์การลุก-นั่งบนเก้าอี้ 60 วินาที (ชาย/หญิง)
        const chairStandStandards = {
            '16-19': { male: [16, 17, 18, 19, 20, 21, 22, 23, 24], female: [16, 17, 18, 19, 20, 21, 22, 23, 24] },
            '20-29': { male: [15, 16, 17, 18, 19, 20, 21, 22, 23], female: [15, 16, 17, 18, 19, 20, 21, 22, 23] },
            '30-39': { male: [14, 15, 16, 17, 18, 19, 20, 21, 22], female: [14, 15, 16, 17, 18, 19, 20, 21, 22] },
            '40-49': { male: [13, 14, 15, 16, 17, 18, 19, 20, 21], female: [13, 14, 15, 16, 17, 18, 19, 20, 21] },
            '50-59': { male: [12, 13, 14, 15, 16, 17, 18, 19, 20], female: [12, 13, 14, 15, 16, 17, 18, 19, 20] }
        };
        
        const standards = chairStandStandards[ageGroup];
        const thresholds = isMale ? standards.male : standards.female;
        
        let level, color, emoji, recommendation;
        
        if (value < thresholds[0]) {
            level = 'ต่ำมาก';
            color = 'badge-danger';
            emoji = '❌';
            recommendation = 'ควรฝึกความแข็งแรงของกล้ามเนื้อขาและสะโพกด้วยการลุกนั่งบนเก้าอี้หรือสควอชเป็นประจำ';
        } else if (value < thresholds[3]) {
            level = 'ต่ำ';
            color = 'badge-warning';
            emoji = '⚠️';
            recommendation = 'ควรฝึกความแข็งแรงของกล้ามเนื้อขาและสะโพกด้วยการลุกนั่งบนเก้าอี้หรือสควอชเป็นประจำ';
        } else if (value < thresholds[6]) {
            level = 'ปานกลาง';
            color = 'badge-info';
            emoji = '👍';
            recommendation = 'ฝึกความแข็งแรงของกล้ามเนื้อขาและสะโพกเป็นประจำเพื่อพัฒนาต่อไป';
        } else if (value < thresholds[8]) {
            level = 'ดี';
            color = 'badge-success';
            emoji = '👍👍';
            recommendation = 'ความแข็งแรงของกล้ามเนื้อขาและสะโพกอยู่ในระดับดี ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        } else {
            level = 'ดีมาก';
            color = 'badge-success';
            emoji = '👍👍👍';
            recommendation = 'ความแข็งแรงของกล้ามเนื้อขาและสะโพกอยู่ในระดับดีมาก ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        }
        
        return {
            testName: 'การลุก-นั่งบนเก้าอี้ 60 วินาที (ครั้ง)',
            value: value,
            level,
            color,
            emoji,
            recommendation
        };
    }
    
    // ฟังก์ชันประเมินการยกเข่าขึ้น-ลง
    function evaluateStepTest(ageGroup, isMale, value) {
        // เกณฑ์การยกเข่าขึ้น-ลง 3 นาที (ชาย/หญิง)
        const stepTestStandards = {
            '16-19': { male: [117, 118, 141, 164, 187], female: [109, 110, 133, 155, 178] },
            '20-29': { male: [113, 114, 138, 161, 184], female: [104, 105, 129, 153, 177] },
            '30-39': { male: [110, 111, 134, 158, 181], female: [97, 98, 124, 150, 176] },
            '40-49': { male: [107, 108, 132, 155, 179], female: [97, 98, 123, 148, 173] },
            '50-59': { male: [101, 102, 128, 153, 179], female: [96, 97, 122, 147, 171] }
        };
        
        const standards = stepTestStandards[ageGroup];
        const thresholds = isMale ? standards.male : standards.female;
        
        let level, color, emoji, recommendation;
        
        if (value < thresholds[0]) {
            level = 'ต่ำมาก';
            color = 'badge-danger';
            emoji = '❌';
            recommendation = 'ควรฝึกความทนทานของระบบหัวใจและหลอดเลือดด้วยการออกกำลังกายแบบแอโรบิกเช่น เดินเร็ว วิ่งเหยาะ ปั่นจักรยาน';
        } else if (value < thresholds[1]) {
            level = 'ต่ำ';
            color = 'badge-warning';
            emoji = '⚠️';
            recommendation = 'ควรฝึกความทนทานของระบบหัวใจและหลอดเลือดด้วยการออกกำลังกายแบบแอโรบิกเช่น เดินเร็ว วิ่งเหยาะ ปั่นจักรยาน';
        } else if (value < thresholds[2]) {
            level = 'ปานกลาง';
            color = 'badge-info';
            emoji = '👍';
            recommendation = 'ฝึกความทนทานของระบบหัวใจและหลอดเลือดเป็นประจำเพื่อพัฒนาต่อไป';
        } else if (value < thresholds[3]) {
            level = 'ดี';
            color = 'badge-success';
            emoji = '👍👍';
            recommendation = 'ความทนทานของระบบหัวใจและหลอดเลือดอยู่ในระดับดี ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        } else {
            level = 'ดีมาก';
            color = 'badge-success';
            emoji = '👍👍👍';
            recommendation = 'ความทนทานของระบบหัวใจและหลอดเลือดอยู่ในระดับดีมาก ควรฝึกเป็นประจำเพื่อรักษาระดับ';
        }
        
        return {
            testName: 'การยกเข่าขึ้น-ลง 3 นาที (ครั้ง)',
            value: value,
            level,
            color,
            emoji,
            recommendation
        };
    }
    
    // ฟังก์ชันแสดงผลลัพธ์
    function displayResults(results) {
        // แสดงผล BMI
        const bmiContent = document.querySelector('#bmiResult .result-content');
        bmiContent.innerHTML = `
            <p><span class="badge ${results.bmiColor}">${results.bmiEmoji} ${results.bmiCategory}</span></p>
            <p>ค่าดัชนีมวลกาย (BMI): <strong>${results.bmi}</strong></p>
            <div class="recommendation">${results.bmiRecommendation}</div>
        `;
        
        // แสดงผลรอบเอว
        const waistContent = document.querySelector('#waistResult .result-content');
        waistContent.innerHTML = `
            <p><span class="badge ${results.waistColor}">${results.waistEmoji} ${results.waistCategory}</span></p>
            <div class="recommendation">${results.waistRecommendation}</div>
        `;
        
        // แสดงผลความดันโลหิต
        const bpContent = document.querySelector('#bloodPressureResult .result-content');
        bpContent.innerHTML = `
            <p><span class="badge ${results.bpColor}">${results.bpEmoji} ${results.bpCategory}</span></p>
            <div class="recommendation">${results.bpRecommendation}</div>
        `;
        
        // แสดงผลสมรรถภาพร่างกาย
        const fitnessContent = document.querySelector('#fitnessResult .result-content');
        let fitnessHtml = '';
        
        const fitnessTests = [
            results.fitnessResults.gripResult,
            results.fitnessResults.sitAndReachResult,
            results.fitnessResults.sitUpsResult,
            results.fitnessResults.chairStandResult,
            results.fitnessResults.stepTestResult
        ];
        
        fitnessTests.forEach(test => {
            fitnessHtml += `
                <div class="fitness-test">
                    <h4><span class="badge ${test.color}">${test.emoji} ${test.level}</span> ${test.testName}: ${test.value}</h4>
                    <p><strong>คำแนะนำ:</strong> ${test.recommendation}</p>
                </div>
            `;
        });
        
        fitnessContent.innerHTML = fitnessHtml;
    }
});