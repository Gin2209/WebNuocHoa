.controller('logoutCtrl', function ($scope, $location, $rootScope, $http) {

    $scope.userData = [];
    $scope.userData = JSON.parse(localStorage.getItem('userData'));
    if ($scope.userData == null) {
        $http.get("userData.js").then(
            function (res) {
                $scope.userData = res.data;
                localStorage.setItem('userData', JSON.stringify(res.data));
            },
            function (res) {
                alert("Lỗi khi lấy userData");
            }
        );
    }
    console.log("userData=", $scope.userData);

    $scope.dangky = function () {
        console.log("Đang chạy hàm đăng ký");
        // Kiểm tra xem $scope.formData có tồn tại và có thuộc tính 'username' không
        if ($scope.formData && $scope.formData.username) {
            $scope.userData.push($scope.formData);
            localStorage.setItem('userData', JSON.stringify($scope.userData));
            alert("Đã đăng ký thành công tài khoản " + $scope.formData.username);
            $location.path('/'); // Update the route based on your application's routing configuration
        } else {
            alert("Lỗi: Tài khoản không hợp lệ");
        }
    };
})
.controller('loginCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.dangnhap = function () {
        console.log("Đang chạy hàm đăng nhập");

        // Fetch the userData from the file using $http
        $http.get('userData.js').then(function (response) {
            $scope.userData = response.data;

            // Lấy giá trị username và password từ $scope
            var u = $scope.u;
            var p = $scope.p;

            // Kiểm tra nếu tên đăng nhập và mật khẩu không được bỏ trống
            if (!u || !p) {
                alert("Đăng nhập không thành công. Vui lòng điền đầy đủ thông tin.");
                return;
            }

            // Kiểm tra xem có sinh viên nào khớp với username và password không
            var index = $scope.userData.findIndex(function (st) {
                return st.user === u && st.pass === p;
            });

            if (index >= 0) {
                // Đặt giá trị username trong $rootScope và sessionStorage
                $rootScope.user = u;
                sessionStorage.setItem('user', u);
                $rootScope.fullName = $scope.userData[index].fullName;
                $scope.hoverUsername = u; // Set the hoverUsername variable
                $location.path('/'); // Chuyển sang trang homepage
            } else {
                console.log("Đăng nhập không thành công");
alert("Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu.");
            }
        }).catch(function (error) {
            console.log("Failed to fetch userData:", error);
        });
    };
})