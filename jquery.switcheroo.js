(function ($) {
    $.fn.switcheroo = function (options) {

        var self = $(this);

        var methods = {
            tb: function () {
                self.click(function () {
                    var container = self.parent();

                    // get remove the current control
                    self.toggle();

                    // replace with textbox
                    var tb = document.createElement('input');
                    tb.type = 'text';
                    var textBox = $(tb);

                    tb.value = self.text();
                    container.append(tb);
                    $(tb).focus();

                    $(tb).blur(function () {

                        self.text($(this).val());
                        self.toggle();
                        $(this).remove();
                    });
                });
            },
            ddl: function () {
                self.click(function () {
                    var container = self.parent();

                    // remove the current control
                    self.toggle();

                    var dl = document.createElement('select');
                    var $dl = $(dl);

                    // build out ddl
                    if (typeof (options) != 'undefined' && typeof (options.items) != 'undefined') {
                        $(options.items).each(function (ndx, data) {
                            var li = document.createElement('option');
                            li.selected = data == self.text();
                            li.value = data;
                            li.text = data;
                            $dl.append(li);
                        });
                    }

                    container.append(dl);
                    $dl.focus();
                    $dl.blur(function () {
                        self.text($dl.val());
                        self.toggle();
                        $dl.remove();
                    });

                    $dl.change(function () {
                        self.text($dl.val());
                        self.toggle();
                        $dl.remove();
                    });
                });
            }
        };

        if (typeof (options) == 'undefined' || typeof (options.type) == 'undefined') {
            methods.tb();
        }
        else {
            if (options.type == 'dropdownlist') {
                methods.ddl();
            }
            else {
                methods.tb();
            }
        }
    }
})(jQuery);
