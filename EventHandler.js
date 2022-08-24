function EventHandler(input) {
    this.events = input;
}

EventHandler.prototype.getEventsBetweenDates = function (start, end) {
    var startDate = Date.parse(start);
    var endDate = Date.parse(end);

    return this.events.filter(event => Date.parse(event.dateStart) >= startDate && Date.parse(event.dateEnd) <= endDate);
}

EventHandler.prototype.getByMonth = function (month) {
    var startMonth = new Date();
    startMonth.setMonth(month - 1);

    return this.events.filter(event => {
        x = new Date(event.dateStart);

        return x.getMonth() == startMonth.getMonth();
    });
}

EventHandler.prototype.getUniqueDateAndSort = function () {
    var zam = events.filter((currentElement, index, array) =>
        index === array.findIndex((t) =>
            t.dateStart === currentElement.dateStart && t.dateEnd === currentElement.dateEnd
        )
    );

    zam.sort(function (a, b) {
        var aa = new Date(a.dateStart);
        var bb = new Date(b.dateStart);

        var aaa = aa.getMonth();
        var bbb = bb.getMonth();

        if (aaa < bbb) {
            return -1;
        }
        if (aaa > bbb) {
            return 1;
        }

        return 0;
    });

    return zam;
}

EventHandler.prototype.getSummary = function () {
    if (arguments.length == 0) {
        return this.events.map(event => {
            if (event.dateStart == event.dateEnd) {
                return "On " + event.dateStart + ": " + event.name + " (" + event.description + ")";
            } else {
                return "From " + event.dateStart + " to " + event.dateEnd + ": " + event.name + " (" + event.description + ")";
            }
        });
    }

    const args = [...arguments];

    return args.map(event => {
        if (Array.isArray(event)) {
            return event.map(item => {
                if (item.dateStart == item.dateEnd) {
                    return "On " + item.dateStart + ": " + item.name + " (" + item.description + ")";
                } else {
                    return "From " + item.dateStart + " to " + item.dateEnd + ": " + item.name + " (" + item.description + ")";
                }
            });
        } else {
            if (event.dateStart == event.dateEnd) {
                return "On " + event.dateStart + ": " + event.name + " (" + event.description + ")";
            } else {
                return "From " + event.dateStart + " to " + event.dateEnd + ": " + event.name + " (" + event.description + ")";
            }
        }


    });


}



Array.prototype.getEventsBetweenDates = function (start, end) {
    EventHandler.getEventsBetweenDates.call(this, start, end);
    return this;
}

Array.prototype.getByMonth = function (month) {
    return EventHandler.getByMonth.call(this, month);
}

Array.prototype.getUniqueDateAndSort = function () {
    EventHandler.getUniqueDateAndSort.call(this);
    return this;    
}

Array.prototype.getSummary = function () {
    return EventHandler.getSummary;
}