function decryptAES(pass) {
  try {
    var content = CryptoJS.AES.decrypt(
      document.getElementById("encrypt-blog").innerHTML.trim(),
      pass
    )
    content = content.toString(CryptoJS.enc.Utf8)
    content = decodeBase64(content)
    content = unescape(content)
    if (content == "") {
      alert("Password was incorrect.")
      showPasswordForm()
    } else {
      localStorage.setItem(localStorageSlug(), pass)
      document.getElementById("encrypt-blog").style.display = "inline"
      document.getElementById("encrypt-blog").innerHTML = ""
      // use jquery to load some js code
      $("#encrypt-blog").html(content)

      document.getElementById("security").style.display = "none"

      if (document.getElementById("toc-div")) {
        document.getElementById("toc-div").style.display = "inline"
      }
    }
  } catch (e) {
    alert("Password Encryption Error")
    console.log(e)
  }
}

function htmlDecode(str) {
  var s = ""
  if (str.length == 0) return ""

  s = str.replace(/&gt;/g, "&")
  s = s.replace(/&lt;/g, "<")
  s = s.replace(/&gt;/g, ">")
  s = s.replace(/&nbsp;/g, "    ")
  s = s.replace(/'/g, "'")
  s = s.replace(/&quot;/g, '"')
  s = s.replace(/<br>/g, "\n")
  return s
}

function decodeBase64(content) {
  content = CryptoJS.enc.Base64.parse(content)
  content = CryptoJS.enc.Utf8.stringify(content)
  return content
}

function showPasswordForm() {
  $("#security").show()
}

function localStorageSlug() {
  return window.location.href.split(".html")[0]
}

// add enter to decrypt
addLoadEvent(function() {
  if (!document.getElementById("pass")) {
    return
  }

  var savedPassword = localStorage.getItem(localStorageSlug())

  if (savedPassword) {
    console.log("saved password: ", savedPassword)
    decryptAES(savedPassword)
  } else {
    showPasswordForm()
  }

  document.getElementById("pass").onkeypress = function(keyPressEvent) {
    if (keyPressEvent.keyCode === 13) {
      var pass = String(document.getElementById("pass").value)
      decryptAES(pass)
    }
  }
})

function addLoadEvent(func) {
  func()
  // var oldonload = window.onload
  // if (typeof window.onload != "function") {
  //   window.onload = func
  // } else {
  //   window.onload = function() {
  //     oldonload()
  //     func()
  //   }
  // }
}
