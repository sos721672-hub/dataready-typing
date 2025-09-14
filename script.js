function startTest() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
  
    if (!name || !email) {
      alert("رجاءً اكتبي الاسم والبريد");
      return;
    }
  
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
  
    document.getElementById("exercise").classList.remove("hidden");
  }
  
  function checkResult() {
    const expected = "أنا أتدرب الآن مع DataReady!";
    const input = document.getElementById("inputArea").value.trim();
  
    const speed = Math.round((input.split(" ").length / 0.5)); // كلمة كل نصف دقيقة تقريبًا
    const errors = [...expected].filter((char, i) => char !== input[i]).length;
    const accuracy = 100 - Math.round((errors / expected.length) * 100);
  
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerHTML = `
      ✅ السرعة: ${speed} كلمة/دقيقة <br>
      🎯 الدقة: ${accuracy}% <br>
    `;
  
    sendToSheet(localStorage.getItem("userName"), localStorage.getItem("userEmail"), speed, accuracy);
  }
  
  function sendToSheet(name, email, speed, accuracy) {
    const url = "https://script.google.com/macros/s/AKfycbxonQ58PmiX-NOQ_nas_1YId0k0CghgOV7BmCU6-xyQzl09lcuYFWlEgcs3xBDvdL2-/exec";
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("speed", speed);
    formData.append("accuracy", accuracy);
  
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((res) => res.text())
      .then((response) => {
        console.log("تم الإرسال بنجاح:", response);
        alert("✅ تم تسجيل نتيجتك في الجدول!");
      })
      .catch((error) => {
        console.error("فشل الإرسال:", error);
        alert("❌ حدث خطأ أثناء الإرسال");
      });
  }
  