def get_data_range(request):
    page = int(request.GET.get("page"))
    per_page = int(request.GET.get("perPage"))
    start = per_page * page
    end = per_page * page + per_page
    return start, end
